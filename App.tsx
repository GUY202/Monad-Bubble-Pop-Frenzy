import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { Difficulty, LeaderboardEntry } from './types';
import { getPersonalBest, submitScore } from './storage';
import Leaderboard from './components/Leaderboard';
import ConnectWallet from './components/ConnectWallet';
import { MONAD_NETWORK_CONFIG } from './constants';

type GameState = 'CONNECTING_WALLET' | 'MENU' | 'PLAYING' | 'GAME_OVER' | 'LEADERBOARD';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('CONNECTING_WALLET');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isOnMonadNetwork, setIsOnMonadNetwork] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [personalBest, setPersonalBest] = useState<number>(0);
  
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [lastScore, setLastScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const handleWalletConnected = async (address: string, provider: any) => {
    setWalletAddress(address);

    try {
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      if (currentChainId === MONAD_NETWORK_CONFIG.chainId) {
        setIsOnMonadNetwork(true);
        const balanceWei = await provider.request({ method: 'eth_getBalance', params: [address, 'latest'] });
        const balanceEth = Number(BigInt(balanceWei)) / 1e18;
        setBalance(`${balanceEth.toFixed(4)} MON`);
      } else {
        setIsOnMonadNetwork(false);
        setBalance(null); // Balance is unavailable on other networks
      }
    } catch (error) {
      console.error("Failed to fetch balance or network info:", error);
      setBalance(null);
      setIsOnMonadNetwork(false);
    }

    const bestScore = await getPersonalBest(address);
    setPersonalBest(bestScore);
    setGameState('MENU');
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setBalance(null);
    setIsOnMonadNetwork(false);
    setNickname('');
    setGameState('CONNECTING_WALLET');
  };

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    if (!nickname.trim()) {
      alert("Please enter a nickname to start.");
      return;
    }
    setDifficulty(selectedDifficulty);
    setGameState('PLAYING');
  };

  const handleEndGame = async (finalScore: number) => {
    setLastScore(finalScore);
    if (walletAddress) {
      const newHighScore = await submitScore({
        nickname,
        score: finalScore,
        difficulty,
        walletAddress
      });
      setIsNewHighScore(newHighScore);
      if (newHighScore) {
        setPersonalBest(finalScore);
      }
    }
    setGameState('GAME_OVER');
  };

  const handleRestart = () => {
    setGameState('PLAYING');
  };

  const handleExit = () => {
    setGameState('MENU');
  };
  
  const handleShowLeaderboard = () => {
    setGameState('LEADERBOARD');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'CONNECTING_WALLET':
        return <ConnectWallet onConnected={handleWalletConnected} />;
      case 'PLAYING':
        return <Game difficulty={difficulty} onEndGame={handleEndGame} onExit={handleExit} />;
      case 'GAME_OVER':
        return <GameOver score={lastScore} isNewHighScore={isNewHighScore} onRestart={handleRestart} onExit={handleExit} />;
      case 'LEADERBOARD':
        return <Leaderboard onBack={handleExit} />;
      case 'MENU':
      default:
        return <Menu
          onStartGame={handleStartGame}
          onShowLeaderboard={handleShowLeaderboard}
          nickname={nickname}
          setNickname={setNickname}
          personalBest={personalBest}
          walletAddress={walletAddress}
        />;
    }
  };
  
  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
       {walletAddress && gameState !== 'CONNECTING_WALLET' && (
        <div className="absolute top-4 right-4 z-20 bg-black/40 text-xs text-cyan-300 font-mono p-2 rounded-lg border border-white/10 flex items-center gap-3">
            <div className="flex flex-col items-end">
                <span>{truncateAddress(walletAddress)}</span>
                {isOnMonadNetwork ? (
                    balance !== null && (
                        <span className="text-yellow-400 font-sans font-bold text-sm">{balance}</span>
                    )
                ) : (
                    <span className="text-yellow-500 text-[10px] text-right mt-0.5">
                        Not on Monad network — balance unavailable
                    </span>
                )}
            </div>
            <button
                onClick={handleDisconnect}
                className="bg-pink-600/50 hover:bg-pink-500/50 text-white font-bold p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
                aria-label="Disconnect Wallet"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
        </div>
      )}
      <div className="relative z-10">
        {renderGameState()}
      </div>
    </main>
  );
};

export default App;