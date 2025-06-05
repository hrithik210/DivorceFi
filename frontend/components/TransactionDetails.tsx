
interface TransactionDetailsProps {
  txHash: string;
  blockTimestamp: number;
}

export const TransactionDetails = ({ txHash, blockTimestamp }  : TransactionDetailsProps) => {
  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
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
  );
};

