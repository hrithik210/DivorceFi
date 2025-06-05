import { MintingState } from "@/types";

interface statusMessageProps {
  mintingState: MintingState,
  txHash?: string;

}

export const StatusMessage = ({ mintingState, txHash } : statusMessageProps) => {
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

  const message = getStatusMessage();
  if (!message) return null;

  return (
    <div className="mt-6 text-center">
      <p className="text-lg font-semibold text-gray-700">{message}</p>
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
  );
};

