// components/WalletButton.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const WalletButton = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <div>Connected to {address}</div>
          <div className="text-gray-500">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-lg font-semibold mb-4">Connect Your Wallet</div>
      
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="block w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mb-2"
        >
          {connector.name}
          {isPending && ' (connecting...)'}
        </button>
      ))}

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error.message}
        </div>
      )}
    </div>
  )
}