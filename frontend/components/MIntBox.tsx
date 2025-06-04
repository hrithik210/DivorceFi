const MintBox = ({ mintingState, txHash, error }) => {
  const getBoxContent = () => {
    switch (mintingState) {
      case 'signing':
        return (
          <div className="animate-bounce">
            <Loader2 className="w-24 h-24 text-white mb-4 animate-spin" />
            <p className="text-white text-xl font-bold">Check Wallet</p>
            <p className="text-white/80 text-sm">Sign the transaction</p>
          </div>
        );
      case 'pending':
        return (
          <div className="animate-bounce">
            <Gift className="w-24 h-24 text-white mb-4" />
            <p className="text-white text-xl font-bold">Minting...</p>
            <p className="text-white/80 text-sm">Tx: {txHash.slice(0, 10)}...</p>
          </div>
        );
      case 'failed':
        return (
          <div>
            <XCircle className="w-24 h-24 text-red-200 mb-4" />
            <p className="text-white text-xl font-bold">Failed</p>
            <p className="text-white/80 text-sm">{error}</p>
          </div>
        );
      default:
        return (
          <>
            <Gift className="w-24 h-24 text-white mb-4 group-hover:animate-bounce" />
            <p className="text-white text-2xl font-bold mb-2">Ready to Mint</p>
            <p className="text-white/80 text-center">Create your eternal bond NFT</p>
            <p className="text-white/60 text-sm mt-2">Cost: 0.01 ETH</p>
          </>
        );
    }
  };

  return (
    <div className={`relative transition-all duration-1000 ${
      mintingState === 'pending' ? 'scale-110 animate-spin' : 'hover:scale-105'
    }`}>
      <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-cyan-300/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {getBoxContent()}
        </div>

        <div className="absolute top-4 right-4 animate-ping">
          <Sparkles className="w-6 h-6 text-white/70" />
        </div>
        <div className="absolute bottom-4 left-4 animate-ping animation-delay-1000">
          <Zap className="w-6 h-6 text-white/70" />
        </div>
      </div>
    </div>
  );
};