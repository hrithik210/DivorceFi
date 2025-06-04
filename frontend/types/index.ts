export interface NFTData {
  tokenId: number;
  partner1: string;
  partner2: string;
  mintedAt: number;
  image: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  type: string;
}

export interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
  size: number;
}

export type MintingState = 'idle' | 'signing' | 'pending' | 'success' | 'failed';