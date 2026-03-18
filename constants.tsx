
import { SlotGame, Volatility, Provider } from './types';

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'NeonLogic',
    slug: 'neonlogic',
    logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=neonlogic&backgroundColor=4f46e5',
    description: 'Specializing in neon-infused high-volatility mathematical models with a focus on progressive multipliers.',
    website: 'https://neonlogic.example.com'
  },
  {
    id: 'p2',
    name: 'DeepSea Gaming',
    slug: 'deepsea-gaming',
    logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=deepsea&backgroundColor=0ea5e9',
    description: 'Expertise in multi-way mechanics and sticky wild symbols, delivering balanced math for long-play sessions.',
    website: 'https://deepsea.example.com'
  },
  {
    id: 'p3',
    name: 'BrassEngine',
    slug: 'brassengine',
    logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=brass&backgroundColor=d97706',
    description: 'A pioneer in classic precision engineering, Clockwork formats, and exceptionally high theoretical RTP percentages.',
    website: 'https://brassengine.example.com'
  },
  {
    id: 'p4',
    name: 'GalacticDev',
    slug: 'galacticdev',
    logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=galactic&backgroundColor=7c3aed',
    description: 'Pushing the boundaries of cluster-pay mechanics and astronomical max win potential.',
    website: 'https://galactic.example.com'
  },
  {
    id: 'p5',
    name: 'Sandstorm Soft',
    slug: 'sandstorm-soft',
    logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=sandstorm&backgroundColor=ea580c',
    description: 'Crafting brutal, extreme-variance models for players who prioritize mathematical peaks over frequency.',
    website: 'https://sandstorm.example.com'
  }
];

export const MOCK_GAMES: SlotGame[] = [
  {
    id: '1',
    title: 'Prism Horizon',
    slug: 'prism-horizon',
    provider: 'NeonLogic',
    rtp: 96.48,
    volatility: Volatility.HIGH,
    maxWin: '25,000x',
    reels: '5x3',
    paylines: '20',
    releaseDate: '2023-11-15',
    releaseYear: 2023,
    thumbnail: 'https://picsum.photos/seed/prism/600/400',
    description: 'A mathematical marvel featuring cascading prisms and progressive multipliers. Prism Horizon focuses on high-frequency small wins leading to major bonus potential.',
    availableAt: ['BetInsight', 'SlotExpert', 'PurePlay'],
    demoUrl: 'https://example.com/demo/prism',
    isPublished: true,
    lastUpdated: '2024-03-10',
    howToPlay: [
      'Match 3 or more prisms to trigger cascades.',
      'Wild symbols replace all standard icons.',
      'Progressive multipliers increase with each win.',
      '3 scatters trigger the Horizon Free Spins.'
    ]
  },
  {
    id: '2',
    title: 'Azure Tides',
    slug: 'azure-tides',
    provider: 'DeepSea Gaming',
    rtp: 95.12,
    volatility: Volatility.MEDIUM,
    maxWin: '10,000x',
    reels: '6x4',
    paylines: '4,096',
    releaseDate: '2024-01-10',
    releaseYear: 2024,
    thumbnail: 'https://picsum.photos/seed/tides/600/400',
    description: 'Explore the depths with multi-way mechanics and sticky wild symbols. Azure Tides offers a balanced math model for sustained sessions.',
    availableAt: ['MarineCasino', 'OceanSlots'],
    isPublished: true,
    lastUpdated: '2024-02-15',
    howToPlay: [
      'Evaluate wins across 4,096 distinct paths.',
      'Anchor wilds stay sticky during respins.',
      'Collect pearls to unlock the bonus tier.'
    ]
  },
  {
    id: '3',
    title: 'Clockwork Vault',
    slug: 'clockwork-vault',
    provider: 'BrassEngine',
    rtp: 97.20,
    volatility: Volatility.LOW,
    maxWin: '5,000x',
    reels: '3x3',
    paylines: '5',
    releaseDate: '2023-08-22',
    releaseYear: 2023,
    thumbnail: 'https://picsum.photos/seed/vault/600/400',
    description: 'Precision engineering in a classic format. The Clockwork Vault features a high RTP designed for players who value longevity and consistent returns.',
    availableAt: ['RetroSpins', 'TechBet'],
    demoUrl: 'https://example.com/demo/vault',
    isPublished: false,
    lastUpdated: '2024-03-01',
    howToPlay: [
      'Line up gear symbols for consistent payouts.',
      'The center vault acts as a mystery multiplier.',
      'Activate all 5 paylines for peak RTP efficiency.'
    ]
  },
  {
    id: '4',
    title: 'Starfall Cascade',
    slug: 'starfall-cascade',
    provider: 'GalacticDev',
    rtp: 96.05,
    volatility: Volatility.HIGH,
    maxWin: '50,000x',
    reels: '7x7',
    paylines: 'Cluster Pay',
    releaseDate: '2024-03-05',
    releaseYear: 2024,
    thumbnail: 'https://picsum.photos/seed/starfall/600/400',
    description: 'A heavy-hitting cluster pays game with infinite multipliers. Designed for high-risk, high-reward profiles.',
    availableAt: ['CosmicCasino', 'StarBet'],
    isPublished: true,
    lastUpdated: '2024-03-18',
    howToPlay: [
      'Groups of 5+ symbols create a cluster win.',
      'Winning clusters explode to allow new drops.',
      'Multiplier increases with every cluster cascade.'
    ]
  },
  {
    id: '5',
    title: 'Desert Echo',
    slug: 'desert-echo',
    provider: 'Sandstorm Soft',
    rtp: 94.88,
    volatility: Volatility.EXTREME,
    maxWin: '150,000x',
    reels: '5x4',
    paylines: '1024',
    releaseDate: '2023-12-01',
    releaseYear: 2023,
    thumbnail: 'https://picsum.photos/seed/desert/600/400',
    description: 'A brutal math model that rewards patience. Desert Echo is known for its legendary "Echo Spins" bonus feature.',
    availableAt: ['AridPlay', 'DuneSlots'],
    demoUrl: 'https://example.com/demo/desert',
    isPublished: true,
    lastUpdated: '2024-03-22',
    howToPlay: [
      'Look for the Echo symbol on reel 3.',
      'Echoes repeat the last winning combination.',
      'Bonus spins have an extreme variance profile.'
    ]
  }
];
