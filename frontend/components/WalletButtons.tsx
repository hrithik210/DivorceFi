'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WalletButton() {
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  return (
    <div className='bg-gray-100 flex justify-between gap-5 p-2'>
      {isConnected ? (
        <div className='text-black font-bold'>
          Connected: {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
        </div>
      ) : (
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer'
        >
          connect wallet
        </button>
      )}
      <button
        onClick={() => disconnect()}
        className='bg-blue-500 text-white px-4 py-2 rounded-lg font-medium cursor-pointer'
      >
        disconnect
      </button>
    </div>
  )
}
