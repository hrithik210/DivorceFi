"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Zap, User, Users, Loader2, CheckCircle, XCircle } from 'lucide-react';

const MintRelationshipNFT = () => {
  // Form state
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [showForm, setShowForm] = useState(true);
  
  // Transaction state
  const [mintingState, setMintingState] = useState('idle'); // 'idle', 'signing', 'pending', 'success', 'failed'
  const [txHash, setTxHash] = useState('');
  const [blockTimestamp, setBlockTimestamp] = useState<number | null>(null);
  const [error, setError] = useState('');
  
  // NFT data from blockchain/metadata
  interface NFTData {
    tokenId: number;
    partner1: string;
    partner2: string;
    mintedAt: number;
    compatibility: number;
    bondStrength: string;
    rarity: string;
    image: string;
  }
  
  const [nftData, setNftData] = useState<NFTData | null>(null);
  
  // Animation state
  interface Particle {
    id: number;
    x: number;
    y: number;
    delay: number;
    size: number;
    type: string;
  }
  
  interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    delay: number;
    size: number;
  }
  
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Generate random particles for animation
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
        delay: Math.random() * 2,
        size: Math.random() * 20 + 10,
        type: Math.random() > 0.5 ? 'heart' : 'sparkle'
      });
    }
    return newParticles;
  };

  // Generate confetti
  const generateConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
        y: -10,
        rotation: Math.random() * 360,
        color: ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 1,
        size: Math.random() * 8 + 4
      });
    }
    return newConfetti;
  };

  // Simulate Web3 minting process
  const handleMint = async () => {
    if (!partner1Name.trim() || !partner2Name.trim()) {
      setError('Please enter both partner names');
      return;
    }

    try {
      setError('');
      setMintingState('signing');
      
      // TODO: Replace with actual Web3 wallet connection and contract interaction
      // Example: const signer = await provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      
      // Simulate signing transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintingState('pending');
      setParticles(generateParticles());
      setConfetti(generateConfetti());
      
      // TODO: Replace with actual contract.mint() call
      // const tx = await contract.mintRelationshipNFT(partner1Name, partner2Name, {
      //   value: ethers.utils.parseEther("0.01") // mint price
      // });
      
      // Simulate pending transaction
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
      setTxHash(mockTxHash);
      
      // TODO: Replace with actual tx.wait()
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // TODO: Replace with actual blockchain data
      // const receipt = await tx.wait();
      // const block = await provider.getBlock(receipt.blockNumber);
      const mockTimestamp = Math.floor(Date.now() / 1000);
      setBlockTimestamp(mockTimestamp);
      
      // TODO: Replace with actual NFT metadata fetching
      // const tokenId = receipt.events[0].args.tokenId;
      // const tokenUri = await contract.tokenURI(tokenId);
      // const metadata = await fetch(tokenUri).then(r => r.json());
      
      const mockNftData = {
        tokenId: Math.floor(Math.random() * 10000),
        partner1: partner1Name,
        partner2: partner2Name,
        mintedAt: mockTimestamp,
        // These would come from smart contract logic or metadata
        compatibility: Math.floor(Math.random() * 20) + 80, // 80-100%
        bondStrength: ['Strong', 'Unbreakable', 'Eternal', 'Infinite'][Math.floor(Math.random() * 4)],
        image: generateNFTImage(partner1Name, partner2Name) // IPFS hash or data URI
      };
      
      setNftData(mockNftData);
      setMintingState('success');
      
    } catch (err) {
      console.error('Minting failed:', err);
      setError(err.message || 'Transaction failed');
      setMintingState('failed');
    } finally {
      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
        setConfetti([]);
      }, 4000);
    }
  };

  // TODO: Implement actual rarity calculation based on contract logic


  // TODO: Generate actual NFT image or return IPFS hash
  const generateNFTImage = (name1, name2) => {
    // This would either:
    // 1. Return an IPFS hash from pre-generated images
    // 2. Generate SVG/Canvas image on-chain or off-chain
    // 3. Use a generative art algorithm
    return 'data:image/svg+xml;base64,' + btoa(`
      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF6B9D"/>
            <stop offset="100%" style="stop-color:#4ECDC4"/>
          </linearGradient>
        </defs>
        <rect width="300" height="300" fill="url(#grad)"/>
        <text x="150" y="130" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${name1}</text>
        <text x="150" y="160" text-anchor="middle" fill="white" font-size="24">💕</text>
        <text x="150" y="190" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${name2}</text>
      </svg>
    `);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getStatusMessage = () => {
    switch (mintingState) {
      case 'signing':
        return 'Please sign the transaction in your wallet...';
      case 'pending':
        return 'Transaction submitted! Waiting for confirmation...';
      case 'success':
        return 'NFT minted successfully! 🎉';
      case 'failed':
        return 'Transaction failed. Please try again.';
      default:
        return '';
    }
  };

  const reset = () => {
    setShowForm(true);
    setMintingState('idle');
    setNftData(null);
    setPartner1Name('');
    setPartner2Name('');
    setTxHash('');
    setBlockTimestamp(null);
    setError('');
    setParticles([]);
    setConfetti([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute pointer-events-none animate-bounce`}
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        >
          {particle.type === 'heart' ? (
            <Heart className="text-pink-500" size={particle.size} fill="currentColor" />
          ) : (
            <Sparkles className="text-yellow-400" size={particle.size} fill="currentColor" />
          )}
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        {showForm && mintingState === 'idle' ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4 animate-pulse">
                Mint Love ✨
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                Create your unique relationship NFT
              </p>
            </div>

            {/* Partner Input Form */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Enter Partner Names</h3>
                <p className="text-gray-600 text-sm mt-2">These will be permanently stored on the blockchain</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Partner
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={partner1Name}
                      onChange={(e) => setPartner1Name(e.target.value)}
                      placeholder="Enter first partner's name"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      maxLength={20}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Second Partner
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={partner2Name}
                      onChange={(e) => setPartner2Name(e.target.value)}
                      placeholder="Enter second partner's name"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      maxLength={20}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  onClick={() => setShowForm(false)}
                  disabled={!partner1Name.trim() || !partner2Name.trim()}
                  className={`w-full py-4 text-xl font-bold rounded-xl transition-all duration-300 ${
                    !partner1Name.trim() || !partner2Name.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                  }`}
                >
                  Continue to Minting ✨
                </button>
              </div>
            </div>
          </>
        ) : mintingState !== 'success' ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                {partner1Name} 💕 {partner2Name}
              </h1>
            </div>

            {/* Mint Box */}
            <div className={`relative transition-all duration-1000 ${
              mintingState === 'pending' ? 'scale-110 animate-spin' : 'hover:scale-105'
            }`}>
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-cyan-300/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Box content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  {mintingState === 'signing' ? (
                    <div className="animate-bounce">
                      <Loader2 className="w-24 h-24 text-white mb-4 animate-spin" />
                      <p className="text-white text-xl font-bold">Check Wallet</p>
                      <p className="text-white/80 text-sm">Sign the transaction</p>
                    </div>
                  ) : mintingState === 'pending' ? (
                    <div className="animate-bounce">
                      <Gift className="w-24 h-24 text-white mb-4" />
                      <p className="text-white text-xl font-bold">Minting...</p>
                      <p className="text-white/80 text-sm">Tx: {txHash.slice(0, 10)}...</p>
                    </div>
                  ) : mintingState === 'failed' ? (
                    <div>
                      <XCircle className="w-24 h-24 text-red-200 mb-4" />
                      <p className="text-white text-xl font-bold">Failed</p>
                      <p className="text-white/80 text-sm">{error}</p>
                    </div>
                  ) : (
                    <>
                      <Gift className="w-24 h-24 text-white mb-4 group-hover:animate-bounce" />
                      <p className="text-white text-2xl font-bold mb-2">Ready to Mint</p>
                      <p className="text-white/80 text-center">Create your eternal bond NFT</p>
                      <p className="text-white/60 text-sm mt-2">Cost: 0.01 ETH</p>
                    </>
                  )}
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 animate-ping">
                  <Sparkles className="w-6 h-6 text-white/70" />
                </div>
                <div className="absolute bottom-4 left-4 animate-ping animation-delay-1000">
                  <Zap className="w-6 h-6 text-white/70" />
                </div>
              </div>
            </div>

            {/* Status Message */}
            {getStatusMessage() && (
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-gray-700">{getStatusMessage()}</p>
                {txHash && (
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm underline mt-2 block"
                  >
                    View on Etherscan
                  </a>
                )}
              </div>
            )}

            {/* Mint Button */}
            <button
              onClick={handleMint}
              disabled={mintingState !== 'idle'}
              className={`mt-12 px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 transform ${
                mintingState !== 'idle'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl'
              } text-white relative overflow-hidden group`}
            >
              <span className="relative z-10">
                {mintingState === 'idle' ? 'Mint Relationship NFT ✨' : 
                 mintingState === 'signing' ? 'Waiting for Signature...' :
                 mintingState === 'pending' ? 'Transaction Pending...' :
                 mintingState === 'failed' ? 'Try Again' : 'Minting...'}
              </span>
              {mintingState === 'idle' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>

            {(mintingState === 'failed' || mintingState === 'idle') && (
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 underline"
              >
                ← Back to Name Entry
              </button>
            )}
          </>
        ) : (
          <>
            {/* Success State - NFT Reveal */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-600">Your Relationship NFT has been minted!</p>
              <p className="text-sm text-gray-500 mt-2">Token ID: #{nftData?.tokenId}</p>
            </div>

            {/* NFT Card with Real Data */}
            <div className="perspective-1000 mb-8">
              <div className="relative transform-gpu transition-all duration-1000 hover:rotate-y-12 hover:scale-105 animate-fade-in-up">
                <div className="w-80 h-96 md:w-96 md:h-[480px] bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 rounded-3xl shadow-2xl p-8 relative overflow-hidden group">
                  {/* NFT Image */}
                  <div className="w-full h-32 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                    <img src={nftData?.image} alt="Relationship NFT" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* NFT Content with Real Data */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {nftData?.partner1} 💕 {nftData?.partner2}
                      </h3>
                      <p className="text-gray-600 mb-4">Eternal Bond Collection</p>
                      
                      {/* Real Stats from Contract/Metadata */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Compatibility</span>
                          <span className="text-sm font-semibold text-pink-600">{nftData?.compatibility}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Bond Strength</span>
                          <span className="text-sm font-semibold text-purple-600">{nftData?.bondStrength}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rarity</span>
                          <span className="text-sm font-semibold text-cyan-600">{nftData?.rarity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">
                        Minted on {formatTimestamp(blockTimestamp)}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        Block: {Math.floor(Math.random() * 1000000) + 18000000}
                      </p>
                      <div className="flex justify-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Heart key={i} className="w-4 h-4 text-pink-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md">
              <h4 className="font-bold text-gray-800 mb-3">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Hash:</span>
                  <a 
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {txHash.slice(0, 6)}...{txHash.slice(-4)}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gas Used:</span>
                  <span className="text-gray-800">{Math.floor(Math.random() * 100000) + 100000}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Time:</span>
                  <span className="text-gray-800">{formatTimestamp(blockTimestamp)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Share NFT 📱
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                View on OpenSea 🎨
              </button>
              <button
                onClick={reset}
                className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Mint Another ✨
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MintRelationshipNFT;