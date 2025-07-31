// Mock data for CaseBattle application

export const mockCases = [
  {
    id: 1,
    name: "Ancient Collection",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    items: [
      { name: "AK-47 | Redline", rarity: "legendary", value: 15.40, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" },
      { name: "AWP | Dragon Lore", rarity: "mythical", value: 145.20, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop" },
      { name: "M4A4 | Howl", rarity: "rare", value: 85.60, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" },
      { name: "Glock-18 | Water Elemental", rarity: "common", value: 3.20, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Mirage Collection",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=300&h=200&fit=crop",
    items: [
      { name: "Karambit | Fade", rarity: "mythical", value: 280.50, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" },
      { name: "USP-S | Kill Confirmed", rarity: "legendary", value: 45.30, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop" },
      { name: "Desert Eagle | Blaze", rarity: "rare", value: 25.80, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" }
    ]
  },
  {
    id: 3,
    name: "Dust2 Collection",
    price: 1.25,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    items: [
      { name: "AK-47 | Fire Serpent", rarity: "legendary", value: 95.40, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop" },
      { name: "P90 | Asiimov", rarity: "rare", value: 12.60, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop" }
    ]
  }
];

export const mockActiveBattles = [
  {
    id: 1,
    name: "Epic Battle #1247",
    case: mockCases[0],
    players: [
      { id: 1, username: "SteamMaster", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face", value: 0, isWinner: false },
      { id: 2, username: "CaseKing", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face", value: 0, isWinner: false }
    ],
    status: "active",
    totalValue: 5.00,
    rounds: 3,
    currentRound: 2,
    timeLeft: 45
  },
  {
    id: 2,
    name: "Pro Battle #1248",
    case: mockCases[1],
    players: [
      { id: 3, username: "ProGamer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", value: 0, isWinner: false },
      { id: 4, username: "LuckySeven", avatar: "https://images.unsplash.com/photo-1494790108755-2616c15c0e8?w=80&h=80&fit=crop&crop=face", value: 0, isWinner: false },
      { id: 5, username: "SkinHunter", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", value: 0, isWinner: false }
    ],
    status: "waiting",
    totalValue: 15.00,
    rounds: 5,
    currentRound: 1,
    timeLeft: 120
  }
];

export const mockCompletedBattles = [
  {
    id: 3,
    name: "Legendary Battle #1245",
    case: mockCases[0],
    players: [
      { id: 1, username: "SteamMaster", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face", value: 45.60, isWinner: true },
      { id: 6, username: "NewPlayer", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face", value: 12.30, isWinner: false }
    ],
    status: "completed",
    totalValue: 57.90,
    rounds: 3,
    winner: "SteamMaster"
  }
];

export const mockUserStats = {
  username: "Player1",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
  balance: 125.50,
  battlesWon: 23,
  battlesLost: 15,
  totalValue: 1250.80,
  rank: "Pro",
  level: 15
};

export const mockLeaderboard = [
  { rank: 1, username: "CaseKing", wins: 156, value: 5240.50, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face" },
  { rank: 2, username: "ProGamer", wins: 142, value: 4890.20, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { rank: 3, username: "SteamMaster", wins: 128, value: 4325.80, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face" },
  { rank: 4, username: "LuckySeven", wins: 98, value: 3450.60, avatar: "https://images.unsplash.com/photo-1494790108755-2616c15c0e8?w=80&h=80&fit=crop&crop=face" },
  { rank: 5, username: "SkinHunter", wins: 87, value: 2980.40, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" }
];

export const mockInventory = [
  { id: 1, name: "AK-47 | Redline", rarity: "legendary", value: 15.40, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop", tradeable: true },
  { id: 2, name: "AWP | Dragon Lore", rarity: "mythical", value: 145.20, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop", tradeable: true },
  { id: 3, name: "Karambit | Fade", rarity: "mythical", value: 280.50, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop", tradeable: false },
  { id: 4, name: "Desert Eagle | Blaze", rarity: "rare", value: 25.80, image: "https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop", tradeable: true }
];

export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'mythical': return 'text-red-400 border-red-400';
    case 'legendary': return 'text-purple-400 border-purple-400';
    case 'rare': return 'text-blue-400 border-blue-400';
    case 'common': return 'text-gray-400 border-gray-400';
    default: return 'text-gray-400 border-gray-400';
  }
};