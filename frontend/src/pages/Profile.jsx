import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { 
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Percent
} from 'lucide-react';
import { mockUserStats, mockCompletedBattles } from '../mock';

const Profile = () => {
  const winRate = ((mockUserStats.battlesWon / (mockUserStats.battlesWon + mockUserStats.battlesLost)) * 100).toFixed(1);
  const totalBattles = mockUserStats.battlesWon + mockUserStats.battlesLost;
  const levelProgress = ((mockUserStats.level % 10) / 10) * 100; // Simulated level progress

  const achievements = [
    { name: 'First Victory', description: 'Win your first battle', icon: Trophy, completed: true },
    { name: 'High Roller', description: 'Win a battle worth $100+', icon: TrendingUp, completed: true },
    { name: 'Lucky Streak', description: 'Win 5 battles in a row', icon: Star, completed: false },
    { name: 'Case Opener', description: 'Open 50 cases', icon: Target, completed: true },
    { name: 'Elite Player', description: 'Reach Pro rank', icon: Award, completed: true },
    { name: 'Veteran', description: 'Play for 100 days', icon: Calendar, completed: false },
  ];

  const recentBattles = mockCompletedBattles.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24 border-4 border-gray-700">
              <AvatarImage src={mockUserStats.avatar} />
              <AvatarFallback className="text-2xl">{mockUserStats.username[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{mockUserStats.username}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  {mockUserStats.rank}
                </Badge>
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  Level {mockUserStats.level}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">${mockUserStats.totalValue.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{mockUserStats.battlesWon}</div>
                  <div className="text-gray-400 text-sm">Battles Won</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{winRate}%</div>
                  <div className="text-gray-400 text-sm">Win Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{totalBattles}</div>
                  <div className="text-gray-400 text-sm">Total Battles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Level {mockUserStats.level}</span>
                    <span className="text-gray-400">Level {mockUserStats.level + 1}</span>
                  </div>
                  <Progress value={levelProgress} className="h-3" />
                  <p className="text-xs text-gray-500 text-center">
                    {(10 - (mockUserStats.level % 10))} more wins to level up
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Battle Statistics */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Battle Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Battles Won</span>
                      <span className="text-green-400 font-semibold">{mockUserStats.battlesWon}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Battles Lost</span>
                      <span className="text-red-400 font-semibold">{mockUserStats.battlesLost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Win Rate</span>
                      <div className="flex items-center text-yellow-400 font-semibold">
                        <Percent className="w-4 h-4 mr-1" />
                        {winRate}%
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Value Won</span>
                      <span className="text-green-400 font-semibold">${mockUserStats.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Current Balance</span>
                      <span className="text-blue-400 font-semibold">${mockUserStats.balance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Current Rank</span>
                      <Badge className="bg-purple-600 text-white">{mockUserStats.rank}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Battles */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Battles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBattles.map((battle) => (
                    <div key={battle.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Trophy className={`w-4 h-4 ${
                          battle.winner === mockUserStats.username ? 'text-yellow-400' : 'text-gray-500'
                        }`} />
                        <div>
                          <p className="text-white font-medium">{battle.name}</p>
                          <p className="text-gray-400 text-sm">{battle.case.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          battle.winner === mockUserStats.username ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {battle.winner === mockUserStats.username ? 'Won' : 'Lost'}
                        </div>
                        <div className="text-gray-400 text-sm">${battle.totalValue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.completed ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-700/50'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.completed ? 'text-green-400' : 'text-gray-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.completed ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.completed && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;