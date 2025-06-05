const NFTCard = ({ nftData, blockTimestamp }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="perspective-1000 mb-8">
      <div className="relative transform-gpu transition-all duration-1000 hover:rotate-y-12 hover:scale-105 animate-fade-in-up">
        <div className="w-80 h-96 md:w-96 md:h-[480px] bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200 rounded-3xl shadow-2xl p-8 relative overflow-hidden group">
          <div className="w-full h-32 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
            <img src={nftData?.image} alt="Relationship NFT" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {nftData?.partner1} 💕 {nftData?.partner2}
              </h3>
              <p className="text-gray-600 mb-4">Eternal Bond Collection</p>
              
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
  );
};

