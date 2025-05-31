'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WalletButton() {
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  return (
    <div className='bg-red-300 flex justify-between gap-5'>
      {isConnected ? (
        <div className='text-white font-bold'>
          Connected: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'
        >
          connect
        </button>
      )}
      <button
        onClick={() => disconnect()}
        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
      >
        disconnect
      </button>
    </div>
  )
}
