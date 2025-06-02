import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Zap } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  type: string;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
  size: number;
}

const MintRelationshipNFT = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  // Generate random particles for animation
  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
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
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 1,
        size: Math.random() * 8 + 4
      });
    }
    return newConfetti;
  };

  const handleMint = async () => {
    setIsMinting(true);
    setParticles(generateParticles());
    setConfetti(generateConfetti());
    
    // Simulate minting process
    setTimeout(() => {
      setShowNFT(true);
    }, 3000);
    
    setTimeout(() => {
      setIsMinting(false);
      setParticles([]);
      setConfetti([]);
    }, 4000);
  };

  const reset = () => {
    setShowNFT(false);
    setIsMinting(false);
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
        {!showNFT ? (
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

            {/* Mint Box */}
            <div className={`relative transition-all duration-1000 ${isMinting ? 'scale-110 animate-spin' : 'hover:scale-105'}`}>
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-cyan-300/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Box content */}
                <div className="relative z-10 flex flex-col items-center">
                  {isMinting ? (
                    <div className="animate-bounce">
                      <Gift className="w-24 h-24 text-white mb-4" />
                      <p className="text-white text-xl font-bold">Minting...</p>
                    </div>
                  ) : (
                    <>
                      <Gift className="w-24 h-24 text-white mb-4 group-hover:animate-bounce" />
                      <p className="text-white text-2xl font-bold mb-4">Mystery Box</p>
                      <p className="text-white/80 text-center px-4">Click to reveal your relationship NFT</p>
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

            {/* Mint Button */}
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={`mt-12 px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 transform ${
                isMinting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl'
              } text-white relative overflow-hidden group`}
            >
              <span className="relative z-10">
                {isMinting ? 'Minting Magic...' : 'Mint Relationship NFT ✨'}
              </span>
              {!isMinting && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </>
        ) : (
          <>
            {/* NFT Reveal */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-600">Your Relationship NFT has been minted!</p>
            </div>

            {/* NFT Card */}
            <div className="perspective-1000 mb-8">
              <div className="relative transform-gpu transition-all duration-1000 hover:rotate-y-12 hover:scale-105 animate-fade-in-up">
                <div className="w-80 h-96 md:w-96 md:h-[480px] bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 rounded-3xl shadow-2xl p-8 relative overflow-hidden group">
                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* NFT Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                        <Heart className="w-12 h-12 text-white" fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Love Connection #1</h3>
                      <p className="text-gray-600 mb-4">Eternal Bond Collection</p>
                      
                      {/* Relationship Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Compatibility</span>
                          <span className="text-sm font-semibold text-pink-600">98%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Love Level</span>
                          <span className="text-sm font-semibold text-purple-600">Infinite ♾️</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rarity</span>
                          <span className="text-sm font-semibold text-cyan-600">Legendary ✨</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Minted on {new Date().toLocaleDateString()}</p>
                      <div className="flex justify-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Heart key={i} className="w-4 h-4 text-pink-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 animate-float">
                    <Sparkles className="w-6 h-6 text-yellow-400" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-4 left-4 animate-float animation-delay-2000">
                    <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                Share NFT 📱
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
                View Collection 🎨
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