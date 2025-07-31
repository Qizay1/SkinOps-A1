import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { 
  User,
  Calendar,
  Trophy,
  Package,
  Star,
  TrendingUp,
  Award,
  Gift,
  Share2,
  Edit
} from 'lucide-react';
import { mockUser, gameConfigs } from '../mock';

const Profile = () => {
  const xpProgress = (mockUser.xp / (mockUser.xp + mockUser.xpToNext)) * 100;
  const totalSpent = mockUser.totalSpent;
  const totalWon = mockUser.totalWon;
  const profit = totalWon - totalSpent;

  const achievements = [
    { name: 'First Case', description: 'Open your first case', icon: Package, completed: true },
    { name: 'Lucky Winner', description: 'Win an item worth 500₽+', icon: Star, completed: true },
    { name: 'Case Addict', description: 'Open 100 cases', icon: Trophy, completed: true },
    { name: 'High Roller', description: 'Open a case worth 5,000₽+', icon: TrendingUp, completed: false },
    { name: 'Profitable', description: 'Achieve 10,000₽+ profit', icon: Award, completed: profit > 10000 },
    { name: 'Veteran', description: 'Be active for 180 days', icon: Calendar, completed: false },
  ];

  const recentActivity = [
    { action: 'Opened', item: 'CS:GO Knife Case', game: 'csgo', value: 2499, time: '2 hours ago' },
    { action: 'Won', item: 'AK-47 | Fire Serpent', game: 'csgo', value: 847, time: '3 hours ago' },
    { action: 'Opened', item: 'Valorant Premium Case', game: 'valorant', value: 599, time: '1 day ago' },
    { action: 'Won', item: 'Diamond Sword', game: 'minecraft', value: 156, time: '2 days ago' },
  ];

  const favoriteGames = [
    { game: 'csgo', casesOpened: 45, spent: 12450, won: 15230 },
    { game: 'valorant', casesOpened: 23, spent: 6890, won: 4560 },
    { game: 'minecraft', casesOpened: 18, spent: 2340, won: 3120 },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border-orange-500/30 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-orange-500">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="text-2xl bg-gray-700">{mockUser.username[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 rounded-full w-8 h-8 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <h1 className="text-3xl font-bold text-white">{mockUser.username}</h1>
                  <Badge className="bg-orange-500 text-white">
                    Level {mockUser.level}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Level {mockUser.level}</span>
                    <span className="text-gray-400">Level {mockUser.level + 1}</span>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                  <p className="text-xs text-gray-500 text-center">
                    {mockUser.xpToNext} XP until next level
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">{mockUser.casesOpened}</div>
                    <div className="text-gray-400 text-sm">Cases Opened</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">+{profit.toLocaleString()}₽</div>
                    <div className="text-gray-400 text-sm">Profit</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{totalWon.toLocaleString()}₽</div>
                    <div className="text-gray-400 text-sm">Total Won</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {new Date(mockUser.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-gray-400 text-sm">Member Since</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-orange-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.completed 
                        ? 'bg-orange-900/20 border-orange-500/30' 
                        : 'bg-gray-700/30 border-gray-600'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <achievement.icon className={`w-8 h-8 ${
                          achievement.completed ? 'text-orange-400' : 'text-gray-500'
                        }`} />
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            achievement.completed ? 'text-orange-400' : 'text-gray-400'
                          }`}>
                            {achievement.name}
                          </h4>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                        {achievement.completed && (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl">{gameConfigs[activity.game]?.mascot}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{activity.action}</span>
                          <span className="text-gray-300">{activity.item}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">{gameConfigs[activity.game]?.name}</span>
                          <span className="text-orange-400 font-semibold">{activity.value}₽</span>
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Statistics */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Balance:</span>
                  <span className="text-orange-400 font-semibold">{mockUser.balance.toLocaleString()}₽</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Spent:</span>
                  <span className="text-red-400 font-semibold">{totalSpent.toLocaleString()}₽</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Won:</span>
                  <span className="text-green-400 font-semibold">{totalWon.toLocaleString()}₽</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Net Profit:</span>
                    <span className={`font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {profit >= 0 ? '+' : ''}{profit.toLocaleString()}₽
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Games */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Favorite Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {favoriteGames.map((gameData, index) => {
                  const gameConfig = gameConfigs[gameData.game];
                  const gameProfit = gameData.won - gameData.spent;
                  return (
                    <div key={index} className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-xl">{gameConfig?.mascot}</div>
                        <span className="text-white font-medium">{gameConfig?.name}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cases:</span>
                          <span className="text-white">{gameData.casesOpened}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Profit:</span>
                          <span className={gameProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {gameProfit >= 0 ? '+' : ''}{gameProfit.toLocaleString()}₽
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <h4 className="text-white font-medium mb-2">Referral Program</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Invite friends and earn 500₽ for each successful referral!
                </p>
                <div className="bg-gray-700 rounded px-3 py-2 mb-4">
                  <span className="text-orange-400 font-mono text-sm">{mockUser.referralCode}</span>
                </div>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                  Share Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;