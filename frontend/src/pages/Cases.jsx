import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { allCases, allCasesFlat, gameConfigs, getRarityColor } from '../mock';

const Cases = () => {
  const { gameId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low');
  const [filterRarity, setFilterRarity] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);

  // Get cases based on route - specific game or all cases
  const cases = gameId && allCases[gameId] ? allCases[gameId] : allCasesFlat;
  const currentGame = gameId ? gameConfigs[gameId] : null;

  const filteredCases = cases
    .filter(caseItem => {
      const matchesSearch = caseItem.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === 'all' || caseItem.rarity === filterRarity;
      return matchesSearch && matchesRarity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'rarity': return a.rarity.localeCompare(b.rarity);
        default: return 0;
      }
    });

  const handlePreviewCase = (caseItem) => {
    setSelectedCase(caseItem);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          {currentGame && (
            <div className="flex items-center mb-4">
              <Link to="/games">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
              </Link>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentGame && (
                <div className="text-4xl">{currentGame.mascot}</div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {currentGame ? `${currentGame.name} Cases` : 'All Cases'}
                </h1>
                <p className="text-gray-400">
                  {currentGame 
                    ? `Discover ${currentGame.name} skins and items`
                    : 'Browse cases from all supported games'
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-400">{filteredCases.length}</div>
              <div className="text-gray-400 text-sm">Cases Available</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRarity} onValueChange={setFilterRarity}>
              <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem> 
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="mythical">Mythical</SelectItem>
                <SelectItem value="legendary+">Legendary+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors group">
              <CardHeader className="pb-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-orange-500 text-white font-semibold">
                      {caseItem.price.toLocaleString()}₽
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    {!currentGame && (
                      <div className="text-xl" title={gameConfigs[caseItem.game]?.name}>
                        {gameConfigs[caseItem.game]?.mascot}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className={getRarityColor(caseItem.rarity)}>
                      {caseItem.rarity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <CardTitle className="text-sm text-white mb-1 truncate">{caseItem.name}</CardTitle>
                  {!currentGame && (
                    <p className="text-xs text-gray-400">{gameConfigs[caseItem.game]?.name}</p>
                  )}
                </div>

                {/* Item Preview */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">Contains {caseItem.items.length} items:</p>
                  <div className="space-y-1">
                    {caseItem.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className={`${getRarityColor(item.rarity)} truncate max-w-[80px]`}>
                          {item.name}
                        </span>
                        <span className="text-orange-400 font-medium">{item.value}₽</span>
                      </div>
                    ))}
                    {caseItem.items.length > 2 && (
                      <p className="text-xs text-gray-500">+{caseItem.items.length - 2} more</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handlePreviewCase(caseItem)}
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Link to={`/case/${caseItem.id}`} className="flex-1">
                    <Button 
                      size="sm"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Package className="w-3 h-3 mr-1" />
                      Open
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No cases found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Case Preview Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{gameConfigs[selectedCase.game]?.mascot}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedCase.name}</h2>
                      <p className="text-gray-400">{gameConfigs[selectedCase.game]?.name}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedCase(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>

                <div className="mb-6">
                  <img 
                    src={selectedCase.image} 
                    alt={selectedCase.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Contains {selectedCase.items.length} items
                    </h3>
                    <Badge className="bg-orange-500 text-white text-lg px-4 py-2">
                      {selectedCase.price.toLocaleString()}₽
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {selectedCase.items.map((item, index) => (
                    <div key={index} className={`bg-gray-700 rounded-lg p-3 ${getRarityColor(item.rarity)}`}>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs capitalize">{item.rarity}</span>
                            <span className="text-orange-400 font-semibold">{item.value}₽</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setSelectedCase(null)}
                    variant="outline" 
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Link to={`/case/${selectedCase.id}`} className="flex-1">
                    <Button 
                      onClick={() => setSelectedCase(null)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Open Case - {selectedCase.price.toLocaleString()}₽
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;