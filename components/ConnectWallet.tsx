import React, { useState } from 'react';

declare global {
  interface Window {
    frame?: {
      ethereum?: {
        request: (args: { method: string; params?: any[] }) => Promise<any>;
      };
    };
  }
}

interface ConnectWalletProps {
  onConnected: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    if (window.frame && window.frame.ethereum) {
      try {
        const accounts = await window.frame.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          onConnected(accounts[0]);
        } else {
          setError('No accounts found. Please make sure your wallet is set up.');
        }
      } catch (err) {
        console.error("Wallet connection error:", err);
        setError('Connection failed. Please try again.');
      }
    } else {
      setError('Frame wallet not detected. Please install the Frame extension.');
    }
    setIsConnecting(false);
  };

  return (
    <div className="w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
      <div className="w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-md border border-white/10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] font-fredoka">Welcome!</h1>
        <p className="text-lg md:text-xl mb-8 text-slate-300">Connect your wallet to play</p>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-wait"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ConnectWallet;
