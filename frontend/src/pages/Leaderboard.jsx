import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Trophy,
  Crown,
  Medal,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  Package,
  Zap
} from 'lucide-react';
import { gameConfigs } from '../mock';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('all-time');

  // Mock leaderboard data
  const leaderboardData = [
    { 
      rank: 1, 
      username: 'CaseKing', 
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face',
      totalValue: 248750,
      casesOpened: 1247,
      favoriteGame: 'csgo',
      country: 'US',
      winRate: 73.2
    },
    { 
      rank: 2, 
      username: 'SkinHunter', 
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
      totalValue: 195430,
      casesOpened: 892,
      favoriteGame: 'valorant',
      country: 'DE',
      winRate: 68.5
    },
    { 
      rank: 3, 
      username: 'LootMaster', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      totalValue: 167890,
      casesOpened: 743,
      favoriteGame: 'minecraft',
      country: 'BR',
      winRate: 71.8
    },
    { 
      rank: 4, 
      username: 'ProGamer', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c15c0e8?w=80&h=80&fit=crop&crop=face',
      totalValue: 145670,
      casesOpened: 634,
      favoriteGame: 'pubg',
      country: 'KR',
      winRate: 65.3
    },
    { 
      rank: 5, 
      username: 'RareFinder', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      totalValue: 128950,
      casesOpened: 567,
      favoriteGame: 'apex',
      country: 'FR',
      winRate: 69.7
    }
  ];

  // Extend leaderboard with more players
  const extendedLeaderboard = [...leaderboardData];
  for (let i = 6; i <= 50; i++) {
    extendedLeaderboard.push({
      rank: i,
      username: `Player${i}`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=80&h=80&fit=crop&crop=face`,
      totalValue: Math.floor(Math.random() * 100000) + 20000,
      casesOpened: Math.floor(Math.random() * 500) + 100,
      favoriteGame: Object.keys(gameConfigs)[Math.floor(Math.random() * Object.keys(gameConfigs).length)],
      country: ['US', 'DE', 'BR', 'KR', 'FR', 'JP', 'CA', 'AU'][Math.floor(Math.random() * 8)],
      winRate: Math.floor(Math.random() * 30) + 50
    });
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold text-sm">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'bg-gray-800 border-gray-700';
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'US': '🇺🇸', 'DE': '🇩🇪', 'BR': '🇧🇷', 'KR': '🇰🇷',
      'FR': '🇫🇷', 'JP': '🇯🇵', 'CA': '🇨🇦', 'AU': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Global <span className="text-orange-400">Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See who's leading the pack in case opening across all games
          </p>
        </div>

        {/* Timeframe Tabs */}
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="all-time" className="data-[state=active]:bg-orange-500">
                <Trophy className="w-4 h-4 mr-2" />
                All Time
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-orange-500">
                <Calendar className="w-4 h-4 mr-2" />
                This Month
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-orange-500">
                <TrendingUp className="w-4 h-4 mr-2" />
                This Week
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {leaderboardData.slice(0, 3).map((player, index) => (
            <Card key={player.rank} className={`${getRankBg(player.rank)} border transform hover:scale-105 transition-transform`}>
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  {getRankIcon(player.rank)}
                </div>
                <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-gray-600">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback className="text-xl">{player.username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <span className="text-lg">{getCountryFlag(player.country)}</span>
                  <div className="text-xl">{gameConfigs[player.favoriteGame]?.mascot}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-orange-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold">{player.totalValue.toLocaleString()}₽</span>
                  </div>
                  <div className="flex items-center justify-center text-blue-400">
                    <Package className="w-4 h-4 mr-1" />
                    <span>{player.casesOpened.toLocaleString()} cases</span>
                  </div>
                  <div className="flex items-center justify-center text-green-400">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>{player.winRate}% win rate</span>
                  </div>
                </div>
                {player.rank === 1 && (
                  <Badge className="mt-4 bg-yellow-600 text-yellow-100">
                    Champion
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-orange-400" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-4 p-3 text-gray-400 text-sm font-medium border-b border-gray-700">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Player</div>
                <div className="col-span-2">Total Value</div>
                <div className="col-span-2">Cases</div>
                <div className="col-span-2">Win Rate</div>
                <div className="col-span-1">Game</div>
              </div>

              {/* Player Rows */}
              {extendedLeaderboard.slice(0, 20).map((player) => (
                <div key={player.rank} className={`grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-gray-700/50 transition-colors ${
                  player.rank <= 3 ? getRankBg(player.rank) : 'border border-transparent hover:border-gray-600'
                }`}>
                  <div className="col-span-1 flex items-center">
                    {getRankIcon(player.rank)}
                  </div>
                  
                  <div className="col-span-4 flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{player.username}</h4>
                        <span className="text-sm">{getCountryFlag(player.country)}</span>
                      </div>
                      {player.rank <= 10 && (
                        <Badge variant="outline" className="text-xs border-orange-500 text-orange-400 mt-1">
                          Elite
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-orange-400">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.totalValue.toLocaleString()}₽</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-blue-400">
                      <Package className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.casesOpened.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-green-400">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.winRate}%</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center">
                    <div className="text-xl" title={gameConfigs[player.favoriteGame]?.name}>
                      {gameConfigs[player.favoriteGame]?.mascot}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {leaderboardData[0].totalValue.toLocaleString()}₽
              </div>
              <div className="text-gray-400 text-sm">Highest Total Value</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {leaderboardData[0].casesOpened.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Most Cases Opened</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {Math.max(...leaderboardData.map(p => p.winRate))}%
              </div>
              <div className="text-gray-400 text-sm">Highest Win Rate</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {extendedLeaderboard.length}
              </div>
              <div className="text-gray-400 text-sm">Total Players</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;