// SkinOps - Multi-Game Case Opening Platform Mock Data

// Utility function to generate skin pricing based on case price with proper distribution
const generateSkinPricing = (casePrice, itemCount = 15) => {
  const skins = [];
  const baseCasePrice = casePrice;
  
  // 90% of skins below case price (50-90% of case price)
  const cheapCount = Math.floor(itemCount * 0.9);
  for (let i = 0; i < cheapCount; i++) {
    skins.push({
      value: Number((baseCasePrice * (0.5 + Math.random() * 0.4)).toFixed(2)),
      rarity: Math.random() > 0.7 ? 'rare' : 'common'
    });
  }
  
  // 8% at or just above case price (100-120% of case price)
  const mediumCount = Math.floor(itemCount * 0.08);
  for (let i = 0; i < mediumCount; i++) {
    skins.push({
      value: Number((baseCasePrice * (1.0 + Math.random() * 0.2)).toFixed(2)),
      rarity: 'legendary'
    });
  }
  
  // 1% at 150% of case price
  if (itemCount >= 50) {
    skins.push({
      value: Number((baseCasePrice * 1.5).toFixed(2)),
      rarity: 'mythical'
    });
  }
  
  // 1% at 500% of case price
  if (itemCount >= 100) {
    skins.push({
      value: Number((baseCasePrice * 5.0).toFixed(2)),
      rarity: 'legendary+'
    });
  }
  
  return skins.slice(0, itemCount);
};

// Game configurations with mascots and themes
export const gameConfigs = {
  csgo: {
    name: 'CS:GO',
    displayName: 'Counter-Strike: Global Offensive',
    color: '#FF6B35', // Orange theme
    mascot: '🔫',
    description: 'Tactical shooter with premium weapon skins',
    caseCount: 30
  },
  minecraft: {
    name: 'Minecraft',
    displayName: 'Minecraft',
    color: '#4A5D23',
    mascot: '🧱',
    description: 'Block-building adventure with themed items',
    caseCount: 12
  },
  roblox: {
    name: 'Roblox',
    displayName: 'Roblox',
    color: '#E53E3E',
    mascot: '🎮',
    description: 'User-generated worlds with avatar accessories',
    caseCount: 15
  },
  pubg: {
    name: 'PUBG',
    displayName: 'PUBG: Battlegrounds',
    color: '#F59E0B',
    mascot: '🍗',
    description: 'Battle royale with military-grade equipment',
    caseCount: 10
  },
  pubgm: {
    name: 'PUBG Mobile',
    displayName: 'PUBG Mobile',
    color: '#F97316',
    mascot: '📱',
    description: 'Mobile battle royale experience',
    caseCount: 10
  },
  valorant: {
    name: 'Valorant',
    displayName: 'Valorant',
    color: '#FF4654',
    mascot: '⚡',
    description: 'Tactical FPS with futuristic weapon skins',
    caseCount: 12
  },
  tf2: {
    name: 'TF2',
    displayName: 'Team Fortress 2',
    color: '#CF6679',
    mascot: '🎪',
    description: 'Class-based shooter with quirky cosmetics',
    caseCount: 10
  },
  rust: {
    name: 'Rust',
    displayName: 'Rust',
    color: '#8B4513',
    mascot: '🔨',
    description: 'Survival game with crafted weapon skins',
    caseCount: 10
  },
  dota2: {
    name: 'Dota 2',
    displayName: 'Dota 2',
    color: '#B91C1C',
    mascot: '⚔️',
    description: 'MOBA with hero cosmetics and immortals',
    caseCount: 12
  },
  apex: {
    name: 'Apex Legends',
    displayName: 'Apex Legends',
    color: '#FF6B35',
    mascot: '🚀',
    description: 'Hero shooter battle royale with legend skins',
    caseCount: 10
  }
};

// Generate CS:GO cases (30 cases from 29₽ to 29,999₽)
const generateCSGOCases = () => {
  const cases = [];
  const prices = [
    29, 59, 99, 149, 199, 299, 399, 499, 599, 799,
    999, 1299, 1599, 1999, 2499, 2999, 3999, 4999, 5999, 7999,
    9999, 12999, 14999, 17999, 19999, 22999, 24999, 27999, 29999
  ];
  
  const caseNames = [
    'Dust II Collection', 'Mirage Case', 'Inferno Package', 'Cache Container',
    'Overpass Bundle', 'Cobblestone Case', 'Train Collection', 'Nuke Package',
    'Vertigo Case', 'Ancient Bundle', 'Anubis Collection', 'Breach Package',
    'Knife Case Alpha', 'Knife Case Beta', 'Knife Case Gamma', 'Knife Case Delta',
    'Dragon Lore Case', 'Fire Serpent Package', 'Howl Collection', 'Redline Bundle',
    'Asiimov Case', 'Hyperbeast Package', 'Neo-Noir Collection', 'Printstream Bundle',
    'Golden Coil Case', 'Elite Build Package', 'Bloodsport Collection', 'Fade Bundle',
    'Tiger Tooth Case', 'Doppler Collection'
  ];
  
  prices.forEach((price, index) => {
    const skinPricing = generateSkinPricing(price, 20);
    cases.push({
      id: `csgo_${index + 1}`,
      name: caseNames[index] || `CS:GO Case ${index + 1}`,
      price: price,
      game: 'csgo',
      image: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&q=60&sig=${index}`,
      rarity: price > 10000 ? 'legendary+' : price > 5000 ? 'mythical' : price > 1000 ? 'legendary' : 'rare',
      items: skinPricing.map((skin, skinIndex) => ({
        id: `csgo_${index}_${skinIndex}`,
        name: `AK-47 | ${['Redline', 'Fire Serpent', 'Vulcan', 'Asiimov', 'Neon Rider', 'Bloodsport', 'Phantom Disruptor'][skinIndex % 7]}`,
        rarity: skin.rarity,
        value: skin.value,
        image: `https://images.unsplash.com/photo-${1607454068664 + skinIndex}?w=200&h=150&fit=crop&q=60`
      }))
    });
  });
  
  return cases;
};

// Generate cases for other games
const generateGameCases = (gameKey) => {
  const config = gameConfigs[gameKey];
  const cases = [];
  
  const basePrices = {
    minecraft: [29, 59, 99, 199, 299, 499, 799, 999, 1499, 1999, 2999, 4999],
    roblox: [19, 39, 79, 149, 249, 399, 599, 899, 1299, 1799, 2499, 3499, 4999, 7999, 9999],
    pubg: [49, 99, 199, 399, 699, 999, 1799, 2999, 4999, 7999],
    pubgm: [29, 59, 99, 199, 349, 599, 999, 1499, 2499, 3999],
    valorant: [39, 79, 159, 299, 499, 799, 1299, 1999, 2999, 4999, 7999, 9999],
    tf2: [29, 59, 99, 199, 399, 699, 999, 1499, 2499, 3999],
    rust: [39, 79, 149, 299, 549, 899, 1399, 2199, 3499, 4999],
    dota2: [49, 99, 199, 399, 699, 1199, 1999, 3199, 4999, 7999, 12999, 19999],
    apex: [39, 79, 149, 299, 599, 999, 1599, 2499, 3999, 5999]
  };
  
  const caseNameTemplates = {
    minecraft: ['Creeper Case', 'Diamond Collection', 'Nether Package', 'End Bundle', 'Village Case', 'Ocean Package', 'Mountain Collection', 'Forest Bundle', 'Desert Case', 'Jungle Package', 'Ice Collection', 'Lava Bundle'],
    roblox: ['Avatar Case', 'Premium Package', 'Robux Bundle', 'Elite Collection', 'VIP Case', 'Gold Package', 'Diamond Bundle', 'Rainbow Collection', 'Neon Case', 'Glow Package', 'Sparkle Bundle', 'Cosmic Collection', 'Legendary Case', 'Ultimate Package', 'Master Bundle'],
    pubg: ['Military Case', 'Tactical Package', 'Combat Bundle', 'Weapon Collection', 'Gear Case', 'Equipment Package', 'Soldier Bundle', 'Elite Collection', 'Commander Case', 'Victory Package'],
    pubgm: ['Mobile Case', 'Touch Package', 'Portable Bundle', 'Quick Collection', 'Instant Case', 'Swift Package', 'Speed Bundle', 'Rush Collection', 'Mobile Elite Case', 'Champion Package'],
    valorant: ['Phantom Case', 'Vandal Package', 'Operator Bundle', 'Radiant Collection', 'Agent Case', 'Protocol Package', 'Tactical Bundle', 'Prime Collection', 'Elite Case', 'Valorant Package', 'Championship Bundle', 'Immortal Collection'],
    tf2: ['Mann Co. Case', 'Unusual Package', 'Strange Bundle', 'Vintage Collection', 'Craft Case', 'Trade Package', 'Premium Bundle', 'Elite Collection', 'Rare Case', 'Epic Package'],
    rust: ['Scrap Case', 'Metal Package', 'Weapon Bundle', 'Tool Collection', 'Craft Case', 'Build Package', 'Survive Bundle', 'Raid Collection', 'Elite Case', 'Legendary Package'],
    dota2: ['Immortal Case', 'Arcana Package', 'Mythical Bundle', 'Legendary Collection', 'Rare Case', 'Epic Package', 'Divine Bundle', 'Ancient Collection', 'Treasure Case', 'Cache Package', 'Premium Bundle', 'Ultimate Collection'],
    apex: ['Legend Case', 'Apex Package', 'Battle Bundle', 'Champion Collection', 'Elite Case', 'Victory Package', 'Premium Bundle', 'Legendary Collection', 'Master Case', 'Ultimate Package']
  };
  
  const prices = basePrices[gameKey] || [29, 59, 99, 199, 399, 699, 999, 1499, 2499, 3999];
  const names = caseNameTemplates[gameKey] || [`${config.name} Case`];
  
  prices.forEach((price, index) => {
    const skinPricing = generateSkinPricing(price, 15);
    cases.push({
      id: `${gameKey}_${index + 1}`,
      name: names[index] || `${config.name} Case ${index + 1}`,
      price: price,
      game: gameKey,
      image: `https://images.unsplash.com/photo-${1578662996442 + index * 100}?w=300&h=200&fit=crop&q=60&sig=${gameKey}_${index}`,
      rarity: price > 5000 ? 'legendary+' : price > 2000 ? 'mythical' : price > 500 ? 'legendary' : 'rare',
      items: skinPricing.map((skin, skinIndex) => ({
        id: `${gameKey}_${index}_${skinIndex}`,
        name: `${config.name} Item ${skinIndex + 1}`,
        rarity: skin.rarity,
        value: skin.value,
        image: `https://images.unsplash.com/photo-${1607454068664 + skinIndex * 10}?w=200&h=150&fit=crop&q=60`
      }))
    });
  });
  
  return cases;
};

// Generate all game cases
export const allCases = {
  csgo: generateCSGOCases(),
  minecraft: generateGameCases('minecraft'),
  roblox: generateGameCases('roblox'),
  pubg: generateGameCases('pubg'),
  pubgm: generateGameCases('pubgm'),
  valorant: generateGameCases('valorant'),
  tf2: generateGameCases('tf2'),
  rust: generateGameCases('rust'),
  dota2: generateGameCases('dota2'),
  apex: generateGameCases('apex')
};

// Flatten all cases for search/filter functionality
export const allCasesFlat = Object.values(allCases).flat();

// User data
export const mockUser = {
  id: 1,
  username: 'SkinHunter',
  email: 'user@skinops.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
  balance: 2547.50,
  level: 18,
  xp: 2340,
  xpToNext: 400,
  totalSpent: 15420.80,
  totalWon: 18967.30,
  casesOpened: 147,
  favoriteGame: 'csgo',
  joinDate: '2024-01-15',
  country: 'US',
  referralCode: 'SKIN2024',
  hasWelcomeCase: false // Set to true for new users
};

// Inventory items
export const mockInventory = [
  {
    id: 1,
    name: 'AK-47 | Fire Serpent',
    game: 'csgo',
    rarity: 'legendary+',
    value: 847.50,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
    obtainedFrom: 'Dragon Lore Case',
    obtainedDate: '2024-01-20',
    tradeable: true
  },
  {
    id: 2,
    name: 'Diamond Sword',
    game: 'minecraft',
    rarity: 'mythical',
    value: 156.20,
    image: 'https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=200&h=150&fit=crop',
    obtainedFrom: 'Diamond Collection',
    obtainedDate: '2024-01-18',
    tradeable: true
  }
];

// Gift/Welcome case for new users
export const welcomeCase = {
  id: 'welcome_case',
  name: 'Welcome to SkinOps!',
  price: 0,
  game: 'special',
  image: 'https://images.unsplash.com/photo-1607454068664-67b777ae8ca0?w=300&h=200&fit=crop&q=60&gift=1',
  rarity: 'special',
  description: 'Your free starter case with items from multiple games!',
  items: [
    {
      id: 'welcome_1',
      name: 'Starter AK-47 | Redline',
      game: 'csgo',
      rarity: 'rare',
      value: 25.50,
      image: 'https://images.unsplash.com/photo-1578662996442?w=200&h=150&fit=crop'
    },
    {
      id: 'welcome_2',
      name: 'Wooden Pickaxe',
      game: 'minecraft',
      rarity: 'common',
      value: 12.30,
      image: 'https://images.unsplash.com/photo-1607454068664?w=200&h=150&fit=crop'
    }
  ]
};

// Utility functions
export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'legendary+': return 'text-orange-400 border-orange-400 bg-orange-400/10';
    case 'mythical': return 'text-red-400 border-red-400 bg-red-400/10';
    case 'legendary': return 'text-purple-400 border-purple-400 bg-purple-400/10';
    case 'rare': return 'text-blue-400 border-blue-400 bg-blue-400/10';
    case 'common': return 'text-gray-400 border-gray-400 bg-gray-400/10';
    case 'special': return 'text-orange-400 border-orange-400 bg-orange-400/20';
    default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
  }
};

// Promotional banners
export const promoBanners = [
  {
    id: 1,
    title: 'New User Bonus',
    description: 'Get a free welcome case when you sign up!',
    code: 'WELCOME2024',
    discount: '100%',
    color: 'orange'
  },
  {
    id: 2,
    title: 'Refer a Friend',
    description: 'Both get 500₽ bonus when they make their first purchase',
    code: 'REFER2024',
    discount: '500₽',
    color: 'blue'
  }
];