
export enum Volatility {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  EXTREME = 'Extreme'
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  website?: string;
}

export interface SlotGame {
  id: string;
  title: string;
  slug: string;
  provider: string;
  rtp: number;
  volatility: Volatility;
  maxWin: string;
  reels: string;
  paylines: string;
  releaseDate: string;
  releaseYear: number;
  thumbnail: string;
  description: string;
  availableAt: string[];
  demoUrl?: string;
  isPublished: boolean; // For admin tracking
  lastUpdated: string;  // For admin tracking
  howToPlay?: string[]; // Bullet points for gameplay
}

export interface GameInsight {
  summary: string;
  pros: string[];
  cons: string[];
  strategyScore: number;
}
