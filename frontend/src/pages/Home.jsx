import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Package, 
  Trophy, 
  Users, 
  TrendingUp,
  Star,
  ArrowRight,
  Gift,
  Zap
} from 'lucide-react';
import { gameConfigs, allCasesFlat, promoBanners, welcomeCase, mockUser } from '../mock';

const Home = () => {
  // Get featured cases (highest value from each game)
  const featuredCases = Object.keys(gameConfigs).map(gameKey => {
    const gameCases = allCasesFlat.filter(c => c.game === gameKey);
    return gameCases.reduce((highest, current) => 
      current.price > highest.price ? current : highest
    );
  }).slice(0, 6);

  const stats = [
    { label: 'Active Players', value: '150K+', icon: Users },
    { label: 'Cases Opened', value: '2.5M+', icon: Package },
    { label: 'Total Prizes', value: '₽85M+', icon: Trophy },
    { label: 'Success Rate', value: '99.8%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-orange-900/30 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FF6B35%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Ultimate
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Multi-Game </span>
              Case Opening Platform
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Open cases from CS:GO, Valorant, Minecraft, Roblox, and 6 more popular games. 
              Discover rare skins, trade items, and join the ultimate gaming community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3">
                <Link to="/games" className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Browse Games</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-gray-100 hover:bg-gray-800">
                <Link to="/cases" className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Open Cases</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promoBanners.map((banner) => (
              <Card key={banner.id} className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{banner.title}</h3>
                      <p className="text-gray-300 text-sm">{banner.description}</p>
                      <div className="mt-2">
                        <Badge className="bg-orange-500 text-white">
                          Code: {banner.code}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{banner.discount}</div>
                      <div className="text-xs text-gray-400">Off</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Case (if user is new) */}
      {mockUser.hasWelcomeCase && (
        <section className="py-8 bg-gradient-to-r from-orange-900/10 to-orange-800/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-orange-500/50 bg-orange-900/20">
              <CardContent className="p-8 text-center">
                <Gift className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Gift!</h2>
                <p className="text-gray-300 mb-4">
                  As a new member, you get a free welcome case with items from multiple games!
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Gift className="w-4 h-4 mr-2" />
                  Open Welcome Case
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Games</h2>
            <Link to="/games">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                View All Games
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(gameConfigs).slice(0, 10).map(([gameKey, config]) => (
              <Link key={gameKey} to={`/games/${gameKey}`}>
                <Card className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {config.mascot}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{config.name}</h3>
                    <p className="text-gray-400 text-sm">{config.description}</p>
                    <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {config.caseCount} Cases
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Premium Cases</h2>
            <Link to="/cases">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                All Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCases.map((caseItem) => (
              <Card key={caseItem.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors group">
                <CardHeader>
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500 text-white">
                        {caseItem.price.toLocaleString()}₽
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <div className="text-2xl">
                        {gameConfigs[caseItem.game]?.mascot}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-2">{caseItem.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">{gameConfigs[caseItem.game]?.name}</span>
                    <Badge variant="outline" className="border-orange-500 text-orange-400">
                      {caseItem.items.length} items
                    </Badge>
                  </div>
                  <Link to={`/case/${caseItem.id}`}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                      <Package className="w-4 h-4 mr-2" />
                      Open Case
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-900/20 to-orange-800/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players opening cases, trading skins, and discovering rare items across multiple games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/games">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Star className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button size="lg" variant="outline" className="border-gray-400 text-gray-100 hover:bg-gray-800">
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;