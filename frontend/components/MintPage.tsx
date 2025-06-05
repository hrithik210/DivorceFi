"use client";

import { ConfettiPiece, MintingState, NFTData, Particle } from "@/types";
import { useState } from "react";
import { AnimatedBackground } from "./ui/AnimatedBackground";
import { Header } from "./ui/Header";
import { PartnerInputForm } from "./ui/PartnerInputForm";
import { MintBox } from "./MIntBox";
import { StatusMessage } from "./StatusMessage";
import { NFTCard } from "./NftCard";
import { TransactionDetails } from "./TransactionDetails";
import { ActionButtons } from "./ActionButtons";

const MintRelationshipNFT = () => {
  // Form state
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [showForm, setShowForm] = useState(true);
  
  // Transaction state
  const [mintingState, setMintingState] = useState<MintingState>('idle');
  const [txHash, setTxHash] = useState('');
  const [blockTimestamp, setBlockTimestamp] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [nftData, setNftData] = useState<NFTData | null>(null);
  
  // Animation state
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Utility functions
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

  interface NFTImageProps {
    name1: string;
    name2: string;
  }

  const generateNFTImage = ({ name1, name2 }: NFTImageProps): string => {
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

  const handleMint = async () => {
    if (!partner1Name.trim() || !partner2Name.trim()) {
      setError('Please enter both partner names');
      return;
    }

    try {
      setError('');
      setMintingState('signing');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintingState('pending');
      setParticles(generateParticles());
      setConfetti(generateConfetti());
      
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
      setTxHash(mockTxHash);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTimestamp = Math.floor(Date.now() / 1000);
      setBlockTimestamp(mockTimestamp);
      
      const mockNftData = {
        tokenId: Math.floor(Math.random() * 10000),
        partner1: partner1Name,
        partner2: partner2Name,
        mintedAt: mockTimestamp,
        compatibility: Math.floor(Math.random() * 20) + 80,
        bondStrength: ['Strong', 'Unbreakable', 'Eternal', 'Infinite'][Math.floor(Math.random() * 4)],
        rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
        image: generateNFTImage({ name1: partner1Name, name2: partner2Name })
      };
      
      setNftData(mockNftData);
      setMintingState('success');
      
    } catch (err : any) {
      console.error('Minting failed:', err);
      setError(err.message || 'Transaction failed');
      setMintingState('failed');
    } finally {
      setTimeout(() => {
        setParticles([]);
        setConfetti([]);
      }, 4000);
    }
  };

  const getButtonText = () => {
    switch (mintingState) {
      case 'signing': return 'Waiting for Signature...';
      case 'pending': return 'Transaction Pending...';
      case 'failed': return 'Try Again';
      default: return 'Mint Relationship NFT ✨';
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
      <AnimatedBackground particles={particles} confetti={confetti} />

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        {showForm && mintingState === 'idle' ? (
          <>
            <Header 
              title="Mint Love ✨" 
              subtitle="Create your unique relationship NFT" 
            />
            <PartnerInputForm
              partner1Name={partner1Name}
              setPartner1Name={setPartner1Name}
              partner2Name={partner2Name}
              setPartner2Name={setPartner2Name}
              error={error}
              onContinue={() => setShowForm(false)}
            />
          </>
        ) : mintingState !== 'success' ? (
          <>
            <Header 
              title={`${partner1Name} 💕 ${partner2Name}`}
              className="text-4xl md:text-6xl"
            />
            <MintBox 
              mintingState={mintingState}
              txHash={txHash}
              error={error}
            />
            <StatusMessage 
              mintingState={mintingState}
              txHash={txHash}
            />
            <button
              onClick={handleMint}
              disabled={mintingState !== 'idle'}
              className={`mt-12 px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 transform ${
                mintingState !== 'idle'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl'
              } text-white relative overflow-hidden group`}
            >
              <span className="relative z-10">{getButtonText()}</span>
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
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-600">Your Relationship NFT has been minted!</p>
              <p className="text-sm text-gray-500 mt-2">Token ID: #{nftData?.tokenId}</p>
            </div>
            {blockTimestamp && nftData && <NFTCard nftData={nftData} blockTimestamp={blockTimestamp} />}
            {blockTimestamp && <TransactionDetails txHash={txHash} blockTimestamp={blockTimestamp} />}
            <ActionButtons onReset={reset} />
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
      `}</style>
    </div>
  );
};

export default MintRelationshipNFT;