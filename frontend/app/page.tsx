'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

function Home() {
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const { address, isConnected } = useAccount()
  
  return (
    <div>
      Hello
    </div>
  )
}

export default Home
