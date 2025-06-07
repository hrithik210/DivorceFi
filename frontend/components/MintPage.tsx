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


import abi from '../abi/abi.json'

import { Address, createPublicClient, createWalletClient, custom, http, parseEther } from 'viem'
import { sepolia } from 'viem/chains'

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as Address;

export const CONTRACT_ABI = abi

const MintRelationshipNFT = () => {
  // Form state
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [partner2Address, setPartner2Address] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
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

  // Viem clients
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  })

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
    // Clean the names to avoid encoding issues
    const cleanName1 = name1.replace(/[^\w\s]/g, '').trim();
    const cleanName2 = name2.replace(/[^\w\s]/g, '').trim();
    const cleanStake = stakeAmount || '0';
    
    const svgString = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF6B9D"/>
            <stop offset="100%" style="stop-color:#4ECDC4"/>
          </linearGradient>
        </defs>
        <rect width="300" height="300" fill="url(#grad)"/>
        <text x="150" y="130" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${cleanName1}</text>
        <text x="150" y="160" text-anchor="middle" fill="white" font-size="24">♥</text>
        <text x="150" y="190" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${cleanName2}</text>
        <text x="150" y="220" text-anchor="middle" fill="white" font-size="14">Stake: ${cleanStake} ETH</text>
      </svg>`;
    
    try {
      return 'data:image/svg+xml;base64,' + btoa(svgString);
    } catch (error) {
      // Fallback to URL encoding if base64 fails
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    }
  };

  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleMint = async () => {
    // Check if contract address is still placeholder
    if (CONTRACT_ADDRESS === "0x1234567890123456789012345678901234567890") {
      setError('Please update CONTRACT_ADDRESS with your deployed contract address');
      return;
    }

    // Validation
    if (!partner1Name.trim() || !partner2Name.trim()) {
      setError('Please enter both partner names');
      return;
    }

    if (!partner2Address.trim() || !isValidAddress(partner2Address)) {
      setError('Please enter a valid partner address');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setError('Please enter a valid stake amount');
      return;
    }

    // Check if MetaMask is available
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to continue');
      return;
    }

    try {
      setError('');
      setMintingState('signing');

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create wallet client
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      });

      const [account] = await walletClient.getAddresses();

      if (!account) {
        throw new Error('No account found');
      }

      // Check if user is trying to mint with themselves
      if (account.toLowerCase() === partner2Address.toLowerCase()) {
        setError("Can't date yourself lil bro 😄");
        setMintingState('idle');
        return;
      }

      setMintingState('pending');
      setParticles(generateParticles());
      setConfetti(generateConfetti());

      console.log('Attempting to mint with:', {
        partner2Address,
        stakeAmount,
        account
      });

      // Call the smart contract
      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintRelationship',
        args: [partner2Address as Address],
        value: parseEther(stakeAmount),
        account,
        gas: BigInt(300000) // Add explicit gas limit
      });

      console.log('Transaction hash:', hash);
      setTxHash(hash);

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ 
        hash,
        confirmations: 1,
        timeout: 60000 // 60 second timeout
      });

      console.log('Transaction receipt:', receipt);

      if (receipt.status === 'reverted') {
        throw new Error('Transaction was reverted by the contract');
      }

      // Get block timestamp
      const block = await publicClient.getBlock({ blockNumber: receipt.blockNumber });
      const timestamp = Number(block.timestamp);
      setBlockTimestamp(timestamp);

      // Parse logs to get token ID
      let tokenId: number | null = null;
      
      // Look for RelationshipMinted event
      const relationshipMintedTopic = '0x' + 'RelationshipMinted(uint256,address,address,uint256)'.split('').map(c => c.charCodeAt(0).toString(16)).join('');
      
      for (const log of receipt.logs) {
        try {
          if (log.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase() && log.data) {
            // The tokenId is the first parameter in the data
            const tokenIdHex = '0x' + log.data.slice(2, 66);
            tokenId = parseInt(tokenIdHex, 16);
            console.log('Found tokenId:', tokenId);
            break;
          }
        } catch (e) {
          console.log('Error parsing log:', e);
        }
      }

      console.log('Final tokenId:', tokenId);

      // Create NFT data
      const mockNftData = {
        tokenId: tokenId || Math.floor(Math.random() * 10000),
        partner1: partner1Name,
        partner2: partner2Name,
        mintedAt: timestamp,
        compatibility: Math.floor(Math.random() * 20) + 80,
        bondStrength: ['Strong', 'Unbreakable', 'Eternal', 'Infinite'][Math.floor(Math.random() * 4)],
        rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
        image: generateNFTImage({ name1: partner1Name, name2: partner2Name }),
        stakeAmount: stakeAmount
      };
      
      setNftData(mockNftData);
      setMintingState('success');
      
    } catch (err: any) {
      console.error('Minting failed:', err);
      
      // Handle specific error cases
      if (err.message?.includes('user rejected')) {
        setError('Transaction was rejected by user');
      } else if (err.message?.includes('insufficient funds')) {
        setError('Insufficient funds for transaction');
      } else if (err.message?.includes('cant date yourself')) {
        setError("Can't date yourself lil bro 😄");
      } else if (err.message?.includes('amount should be more than 0')) {
        setError('Stake amount must be greater than 0');
      } else {
        setError(err.message || 'Transaction failed');
      }
      
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
    setPartner2Address('');
    setStakeAmount('');
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
              subtitle="Create your unique relationship NFT on-chain" 
            />
            
            {/* Enhanced form with additional fields */}
            <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={partner1Name}
                    onChange={(e) => setPartner1Name(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={partner2Name}
                    onChange={(e) => setPartner2Name(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors duration-200"
                    placeholder="Enter partner name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partner Address
                  </label>
                  <input
                    type="text"
                    value={partner2Address}
                    onChange={(e) => setPartner2Address(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-200 font-mono text-sm"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stake Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-cyan-200 rounded-xl focus:border-cyan-400 focus:outline-none transition-colors duration-200"
                    placeholder="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This amount will be locked in the contract and split if divorced
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={() => setShowForm(false)}
                disabled={!partner1Name.trim() || !partner2Name.trim() || !partner2Address.trim() || !stakeAmount}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continue to Mint
              </button>
            </div>
          </>
        ) : mintingState !== 'success' ? (
          <>
            <Header 
              title={`${partner1Name} 💕 ${partner2Name}`}
              subtitle={`Staking ${stakeAmount} ETH for your love`}
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
                ← Back to Form
              </button>
            )}
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-600">Your Relationship NFT has been minted on-chain!</p>
              <p className="text-sm text-gray-500 mt-2">Token ID: #{nftData?.tokenId}</p>
              <p className="text-sm text-gray-500">Stake: {stakeAmount} ETH</p>
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
