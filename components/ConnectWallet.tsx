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
          onClick={handleConnect}
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
  );
};

export default ConnectWallet;