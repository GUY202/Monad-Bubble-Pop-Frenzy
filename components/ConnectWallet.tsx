import React, { useState, useEffect } from 'react';

// Update the global window interface for wallet providers
declare global {
  interface Window {
    frame?: {
      ethereum?: any; // EIP-1193 provider
    };
    ethereum?: any & { // EIP-1193 provider
      providers?: any[];
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isRabby?: boolean;
    };
    coinbaseWalletExtension?: any;
  }
}

interface ConnectWalletProps {
  onConnected: (address: string, provider: any) => void;
}

// Using placeholder details for Monad Testnet. Replace with official details when available.
const MONAD_NETWORK_CONFIG = {
  chainId: '0x13881', // 80001 (Polygon Mumbai Testnet as placeholder)
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'], // Placeholder RPC
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'], // Placeholder Explorer
};


// SVG Icons for wallets
const FrameIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 42V6H6V42H42Z" stroke="#f5f5f5" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M6 24H42" stroke="#f5f5f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const MetaMaskIcon = () => (
    <svg width="24" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <g fill="#E2761B">
            <path d="M115.3 256c-4.3 0-8.8-1.7-12.7-5.1-4.1-3.6-13-11.9-19.1-15-5.9-3-12-6.1-12-6.1-3.5-1.7-6.2-4.1-7.8-7.3-1.6-3.2-2-6.8-1.1-10.2l.4-1.6c0-.2.1-.4.1-.6 3.1-12.3 7-27.1 7-27.1 2.3-8.8 6.2-19.7 6.2-19.7 6.5-18.9 14.1-34.3 14.1-34.3-1-3.6-1.5-7.3-1.5-11.1 0-21.2 16.3-38.3 36.4-38.3 16.5 0 30.6 11.2 34.6 26.6 2.4-1.3 5.1-2.1 7.9-2.1 8.8 0 16 7.2 16 16 0 5.4-2.7 10.2-6.9 13.1 3.2 8.3 5 17.5 5 27.4 0 14.2-4.1 27.8-11.5 39.5-6.6 10.3-15.1 19.3-25.2 26.3-3.1 2.2-6.3 4.2-9.5 6.1-9.3 5.3-18.1 10.3-18.1 10.3-4.8 2.6-9.5 5.2-14.2 7.7zM245 42.4c-1.3-1-3-1.6-4.9-1.6-3.2 0-6.1 1.6-7.8 4.2-1.7 2.6-2.1 5.9-1.1 8.9l12.7 41.1c1 3 4 5.1 7.2 5.1 1.9 0 3.8-.7 5.3-2.1 3.2-2.9 4.3-7.3 3-10.9L245 42.4z"/>
            <path d="M128.2 80.3c-1.6 0-3.3.4-5.1 1.2-1.8.8-3.6 2.2-5.4 4.3l-5.6 6.5c-3.5 4.1-8 6.4-12.6 6.4-4.7 0-9.1-2.4-12.7-6.5l-6.2-7.1c-1.6-1.8-3.4-3-5.2-3.7-1.8-.7-3.7-1-5.6-1-4.7 0-8.9 2.1-11.8 5.7L46.8 111c-2.9 3.6-4.2 8-3.7 12.3 2.1 16.8 12.5 41.1 12.5 41.1l3.5 8.7c2 5.1 7.1 8.4 12.5 8.4 1.8 0 3.7-.4 5.6-1.3 5.1-2.4 8.2-7.5 7.6-12.9l-3.3-31.2c-.3-2.6.5-5.2 2.3-7.2l8.7-9.8c.1 0 .2.1.3.1l6.1 4.5c3.2 2.4 7.2 3.1 11.1 1.8 3.9-1.3 7-4.3 8.4-8.2l12.7-34.9c1.4-3.8.3-8-2.9-10.7-2.1-1.8-4.7-2.8-7.3-2.8z"/>
        </g>
    </svg>
);
const CoinbaseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#0052FF"/>
        <path d="M6 6H18V18H6V6Z" fill="white"/>
    </svg>
);
const RabbyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.9642 3.96424C16.9038 4.90381 17.4999 6.20381 17.4999 7.56824V10.4999C17.4999 12.1568 16.1568 13.4999 14.4999 13.4999H9.49994C7.84308 13.4999 6.49994 12.1568 6.49994 10.4999V7.56824C6.49994 6.20381 7.09608 4.90381 8.03565 3.96424L8.74272 3.25717C9.14028 2.85961 9.77385 2.85961 10.1714 3.25717L11.9999 5.08569L13.8284 3.25717C14.226 2.85961 14.8595 2.85961 15.2571 3.25717L15.9642 3.96424ZM12.9999 16.4999C12.9999 15.9476 12.5522 15.4999 11.9999 15.4999C11.4476 15.4999 10.9999 15.9476 10.9999 16.4999V17.4999H12.9999V16.4999ZM15.9999 19.4999C15.9999 17.567 14.4329 16 12.4999 16H11.4999C9.56694 16 7.99994 17.567 7.99994 19.4999V20.9999H15.9999V19.4999Z" fill="white"/>
    </svg>
);
const GenericWalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const BackgroundBubbles = () => {
    const bubbles = [
        { size: 'w-24 h-24', top: '10%', left: '15%', delay: '0s', duration: '10s' },
        { size: 'w-12 h-12', top: '20%', left: '80%', delay: '2s', duration: '12s' },
        { size: 'w-32 h-32', top: '70%', left: '5%', delay: '1s', duration: '9s' },
        { size: 'w-16 h-16', top: '80%', left: '85%', delay: '3s', duration: '11s' },
        { size: 'w-20 h-20', top: '50%', left: '50%', delay: '0.5s', duration: '10s' },
    ];
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {bubbles.map((b, i) => (
                <div 
                    key={i} 
                    className={`absolute rounded-full bg-cyan-500/10 bubble-float ${b.size}`}
                    style={{ 
                        top: b.top, 
                        left: b.left, 
                        animationDelay: b.delay,
                        animationDuration: b.duration
                    }}
                />
            ))}
        </div>
    );
};


const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnected }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [detectedWallets, setDetectedWallets] = useState<{ id: string; name: string; icon: React.ReactElement; provider: any }[]>([]);

    useEffect(() => {
        const providerMetas = [
            {
                id: 'frame',
                name: 'Frame',
                icon: <FrameIcon />,
                getProvider: () => window.frame?.ethereum,
            },
            {
                id: 'rabby',
                name: 'Rabby Wallet',
                icon: <RabbyIcon />,
                getProvider: () => {
                    if (!window.ethereum) return undefined;
                    const provider = window.ethereum.providers?.find((p: any) => p.isRabby) ?? (window.ethereum.isRabby ? window.ethereum : undefined);
                    return provider;
                },
            },
            {
                id: 'metamask',
                name: 'MetaMask',
                icon: <MetaMaskIcon />,
                getProvider: () => {
                    if (!window.ethereum) return undefined;
                    const provider = window.ethereum.providers?.find((p: any) => p.isMetaMask && !p.isRabby);
                    if (provider) return provider;
                    if (window.ethereum.isMetaMask && !window.ethereum.isRabby) return window.ethereum;
                    return undefined;
                },
            },
            {
                id: 'coinbase',
                name: 'Coinbase Wallet',
                icon: <CoinbaseIcon />,
                getProvider: () => {
                    if (!window.ethereum) return undefined;
                    const provider = window.ethereum.providers?.find((p: any) => p.isCoinbaseWallet) ?? (window.ethereum.isCoinbaseWallet ? window.ethereum : undefined);
                    return provider;
                },
            },
        ];

        const foundProviders = new Set();
        let wallets = providerMetas
            .map(meta => ({ ...meta, provider: meta.getProvider() }))
            .filter(wallet => {
                if (!wallet.provider) return false;
                // Deduplicate based on the provider object to avoid showing the same wallet twice
                if (foundProviders.has(wallet.provider)) return false;
                foundProviders.add(wallet.provider);
                return true;
            });
            
        // Add a generic fallback for any other wallet (like Brave Wallet) that hasn't been identified.
        if (window.ethereum && !foundProviders.has(window.ethereum)) {
             wallets.push({
                id: 'default',
                name: 'Wallet',
                icon: <GenericWalletIcon />,
                provider: window.ethereum,
                getProvider: () => window.ethereum
             });
        }

        setDetectedWallets(wallets);
    }, []);

    const trySwitchOrAddNetwork = async (provider: any) => {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: MONAD_NETWORK_CONFIG.chainId }],
            });
        } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [MONAD_NETWORK_CONFIG],
                    });
                } catch (addError) {
                    throw new Error("Failed to add Monad network. Please add it manually.");
                }
            } else if (switchError.code === 4001) {
                 throw new Error("Please switch to Monad network in your wallet to continue.");
            } else {
                 throw new Error("Failed to switch network. Please try again.");
            }
        }
    };
    
    const handleConnectClick = () => {
        setError(null);
        if (detectedWallets.length === 0) {
            setError('No wallet detected. Please install MetaMask, Frame, or another compatible wallet.');
            return;
        }
        
        if (detectedWallets.length === 1) {
             handleWalletSelect(detectedWallets[0].provider);
        } else {
            setShowWalletModal(true);
        }
    };

    const handleWalletSelect = async (provider: any) => {
        setIsConnecting(true);
        setShowWalletModal(false);
        setError(null);
        try {
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found. Please unlock your wallet or create an account.');
            }

            await trySwitchOrAddNetwork(provider);

            onConnected(accounts[0], provider);

        } catch (err: any) {
            console.error("Wallet connection error:", err);
            const message = err.message?.includes('User rejected') 
              ? 'Request rejected. Please try again.' 
              : err.message || 'Connection failed. An unknown error occurred.';
            setError(message);
        } finally {
            setIsConnecting(false);
        }
    };


    const WalletSelectionModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="w-full max-w-sm bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Select a Wallet</h2>
                    <button onClick={() => setShowWalletModal(false)} className="text-slate-400 hover:text-white text-3xl leading-none" aria-label="Close">&times;</button>
                </div>
                <div className="flex flex-col gap-3">
                    {detectedWallets.map(wallet => (
                        <button
                            key={wallet.id}
                            onClick={() => handleWalletSelect(wallet.provider)}
                            className="flex items-center w-full text-left p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            {wallet.icon}
                            <span className="ml-4 text-lg font-semibold text-white">{wallet.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
    
    return (
        <>
            {showWalletModal && <WalletSelectionModal />}
            <div className="relative w-full h-screen max-w-2xl mx-auto flex flex-col items-center justify-center text-white p-4">
                <BackgroundBubbles />
                <div className="relative w-full bg-black/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-md border border-white/10 text-center">
                    <div className="flex justify-center items-center mb-4">
                       <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                               </svg>
                            </div>
                       </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-cyan-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] glow-text">Welcome!</h1>
                    <p className="text-lg md:text-xl mb-8 text-slate-300">Connect your wallet to join the Frenzy</p>
                    <button
                      onClick={handleConnectClick}
                      disabled={isConnecting}
                      className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-all duration-300 ease-in-out hover:from-cyan-400 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 disabled:bg-gray-500 disabled:from-gray-500 disabled:shadow-none disabled:cursor-wait btn-pulse-glow flex items-center justify-center mx-auto"
                    >
                       {isConnecting && (
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                    {error && 
                      <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg relative mt-6 max-w-md mx-auto" role="alert">
                        <span className="block sm:inline">{error}</span>
                      </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ConnectWallet;