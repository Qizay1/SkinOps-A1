import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Package,
  ArrowRight,
  Filter,
  Star
} from 'lucide-react';
import { gameConfigs, allCases } from '../mock';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredGames = Object.entries(gameConfigs).filter(([gameKey, config]) =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGameStats = (gameKey) => {
    const gameCases = allCases[gameKey] || [];
    const totalCases = gameCases.length;
    const minPrice = Math.min(...gameCases.map(c => c.price));
    const maxPrice = Math.max(...gameCases.map(c => c.price));
    const avgPrice = gameCases.reduce((sum, c) => sum + c.price, 0) / totalCases;
    
    return { totalCases, minPrice, maxPrice, avgPrice };
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your <span className="text-orange-400">Game</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover cases from 10 popular games. Each game offers unique skins, items, and experiences.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(([gameKey, config]) => {
            const stats = getGameStats(gameKey);
            return (
              <Card key={gameKey} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">
                      {config.mascot}
                    </div>
                    <Badge 
                      className="bg-orange-500/20 text-orange-400 border-orange-500/30"
                    >
                      {stats.totalCases} Cases
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-orange-400 transition-colors">
                    {config.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{config.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price Range */}
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Price Range:</span>
                      <span className="text-white font-medium">
                        {stats.minPrice}₽ - {stats.maxPrice.toLocaleString()}₽
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-400">Average:</span>
                      <span className="text-orange-400 font-medium">
                        {Math.round(stats.avgPrice).toLocaleString()}₽
                      </span>
                    </div>
                  </div>

                  {/* Popular Cases Preview */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Popular Cases:</p>
                    <div className="space-y-1">
                      {allCases[gameKey]?.slice(0, 2).map((caseItem, index) => (
                        <div key={index} className="flex items-center justify-between text-xs bg-gray-700/30 rounded px-2 py-1">
                          <span className="text-gray-300 truncate">{caseItem.name}</span>
                          <span className="text-orange-400 font-medium">{caseItem.price}₽</span>
                        </div>
                      ))}
                      {stats.totalCases > 2 && (
                        <p className="text-xs text-gray-500 text-center">+{stats.totalCases - 2} more cases</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Link to={`/games/${gameKey}`} className="flex-1">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 group-hover:bg-orange-600">
                        <Package className="w-4 h-4 mr-2" />
                        View Cases
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">10</div>
              <div className="text-gray-400">Supported Games</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {Object.values(allCases).reduce((sum, cases) => sum + cases.length, 0)}
              </div>
              <div className="text-gray-400">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">2.5M+</div>
              <div className="text-gray-400">Cases Opened</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">150K+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
          </div>
        </div>

        {/* Popular Games Highlight */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Most Popular Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['csgo', 'valorant', 'minecraft'].map((gameKey, index) => {
              const config = gameConfigs[gameKey];
              const stats = getGameStats(gameKey);
              return (
                <Card key={gameKey} className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-4xl mr-3">{config.mascot}</div>
                      <div className="text-2xl font-bold text-orange-400">#{index + 1}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{config.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{config.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Cases:</span>
                      <span className="text-orange-400 font-medium">{stats.totalCases}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-400">Max Prize:</span>
                      <span className="text-orange-400 font-medium">{stats.maxPrice.toLocaleString()}₽</span>
                    </div>
                    <Link to={`/games/${gameKey}`} className="block mt-4">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Star className="w-4 h-4 mr-2" />
                        Play Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;