'use client'

import Homepage from '@/components/Homepage'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function Home() {
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount()
  
  return (
    <div>
      <Homepage />
    </div>
  )
}

export default Home
