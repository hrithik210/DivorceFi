"use client";
import { WalletButton } from "@/wallet/wallet-options";
import { useAccount, useBalance, useEnsName } from "wagmi";

export default function Home() {
  const { address, isConnected, chain } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: balance } = useBalance({ address })
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Simple Wallet Connection
      </h1>
      
      <WalletButton />

      {isConnected && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-3">Wallet Details:</h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong>Address:</strong>
              <div className="font-mono text-xs break-all">{address}</div>
            </div>
            
            {ensName && (
              <div>
                <strong>ENS Name:</strong> {ensName}
              </div>
            )}
            
            {balance && (
              <div>
                <strong>Balance:</strong> {Number(balance.formatted).toFixed(4)} {balance.symbol}
              </div>
            )}
            
            {chain && (
              <div>
                <strong>Network:</strong> {chain.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);
}
