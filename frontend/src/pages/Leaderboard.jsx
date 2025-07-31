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
  DollarSign
} from 'lucide-react';
import { mockLeaderboard } from '../mock';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('all-time');

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>;
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

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400">Top players and their achievements</p>
        </div>

        {/* Timeframe Tabs */}
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="all-time" className="data-[state=active]:bg-blue-600">
                <Trophy className="w-4 h-4 mr-2" />
                All Time
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                This Month
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                This Week
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockLeaderboard.slice(0, 3).map((player) => (
            <Card key={player.rank} className={`${getRankBg(player.rank)} border transform hover:scale-105 transition-transform`}>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {getRankIcon(player.rank)}
                </div>
                <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-gray-600">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback className="text-xl">{player.username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-green-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold">${player.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-center text-blue-400">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span>{player.wins} wins</span>
                  </div>
                </div>
                {player.rank === 1 && (
                  <Badge className="mt-3 bg-yellow-600 text-yellow-100">
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
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-4 p-3 text-gray-400 text-sm font-medium border-b border-gray-700">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Player</div>
                <div className="col-span-2">Wins</div>
                <div className="col-span-3">Total Value</div>
                <div className="col-span-2">Status</div>
              </div>

              {/* Player Rows */}
              {mockLeaderboard.map((player) => (
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
                      <h4 className="text-white font-medium">{player.username}</h4>
                      {player.rank <= 3 && (
                        <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
                          Top {player.rank}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-blue-400">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{player.wins}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex items-center">
                    <div className="flex items-center text-green-400">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">${player.value.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        player.rank <= 10 
                          ? 'border-green-500 text-green-400' 
                          : 'border-gray-500 text-gray-400'
                      }`}
                    >
                      {player.rank <= 10 ? 'Elite' : 'Player'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                ${mockLeaderboard[0].value.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Highest Total Value</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {mockLeaderboard[0].wins}
              </div>
              <div className="text-gray-400 text-sm">Most Wins</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">
                {mockLeaderboard.length}
              </div>
              <div className="text-gray-400 text-sm">Active Players</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;