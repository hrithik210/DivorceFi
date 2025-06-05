
export const ActionButtons = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
        Share NFT 📱
      </button>
      <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg">
        View on OpenSea 🎨
      </button>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
      >
        Mint Another ✨
      </button>
    </div>
  );
};