import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Sword, 
  Package, 
  Trophy, 
  Users, 
  TrendingUp,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import { mockActiveBattles, mockCompletedBattles, mockCases, mockLeaderboard } from '../mock';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Ultimate
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Case Battle </span>
              Experience
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Compete against players worldwide, open rare cases, and win valuable skins. 
              Join thousands of players in the most exciting case battles online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3">
                <Link to="/battles" className="flex items-center space-x-2">
                  <Sword className="w-5 h-5" />
                  <span>Start Battle</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-gray-100 hover:bg-gray-800">
                <Link to="/cases" className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Browse Cases</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">$2M+</div>
              <div className="text-gray-400">Prizes Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">100K+</div>
              <div className="text-gray-400">Battles Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Battles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Active Battles</h2>
            <Link to="/battles">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                View All Battles
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockActiveBattles.map((battle) => (
              <Card key={battle.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{battle.name}</CardTitle>
                    <Badge variant={battle.status === 'active' ? 'default' : 'secondary'}>
                      {battle.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Players: {battle.players.length}</span>
                      <span className="text-green-400 font-semibold">${battle.totalValue}</span>
                    </div>
                    
                    <div className="flex -space-x-2">
                      {battle.players.map((player) => (
                        <Avatar key={player.id} className="w-8 h-8 border-2 border-gray-700">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.username[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Round {battle.currentRound}/{battle.rounds}</span>
                      {battle.status === 'active' && (
                        <div className="flex items-center text-orange-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{battle.timeLeft}s</span>
                        </div>
                      )}
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {battle.status === 'active' ? 'Watch Live' : 'Join Battle'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Cases</h2>
            <Link to="/cases">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                All Cases
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCases.map((caseItem) => (
              <Card key={caseItem.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors group">
                <CardHeader>
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">
                        ${caseItem.price}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-2">{caseItem.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{caseItem.items.length} unique items</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    Open Case
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Players */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Top Players</h2>
            <Link to="/leaderboard">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Full Leaderboard
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLeaderboard.slice(0, 3).map((player) => (
              <Card key={player.rank} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                        {player.rank}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{player.username}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{player.wins} wins</span>
                        <span className="text-green-400 font-semibold">${player.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;