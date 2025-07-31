import React, { useState } from 'react';
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
  DollarSign,
  ArrowUpDown,
  Share2,
  Star
} from 'lucide-react';
import { mockInventory, getRarityColor, gameConfigs } from '../mock';
import { useToast } from '../hooks/use-toast';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('value-high');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const { toast } = useToast();

  const handleSellItem = (item) => {
    toast({
      title: "Item Sold!",
      description: `You sold ${item.name} for ${item.value}₽!`,
    });
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSellSelected = () => {
    const totalValue = selectedItems.reduce((sum, itemId) => {
      const item = mockInventory.find(i => i.id === itemId);
      return sum + (item ? item.value : 0);
    }, 0);
    
    toast({
      title: "Items Sold!",
      description: `You sold ${selectedItems.length} items for ${totalValue.toFixed(2)}₽!`,
    });
    setSelectedItems([]);
  };

  const filteredInventory = mockInventory
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
        (filterBy === 'tradeable' && item.tradeable) ||
        (filterBy === 'non-tradeable' && !item.tradeable) ||
        item.rarity === filterBy ||
        item.game === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'value-high': return b.value - a.value;
        case 'value-low': return a.value - b.value;
        case 'name': return a.name.localeCompare(b.name);
        case 'rarity': return a.rarity.localeCompare(b.rarity);
        case 'date': return new Date(b.obtainedDate) - new Date(a.obtainedDate);
        default: return 0;
      }
    });

  const totalValue = mockInventory.reduce((sum, item) => sum + item.value, 0);
  const selectedValue = selectedItems.reduce((sum, itemId) => {
    const item = mockInventory.find(i => i.id === itemId);
    return sum + (item ? item.value : 0);
  }, 0);

  const gameStats = mockInventory.reduce((stats, item) => {
    if (!stats[item.game]) {
      stats[item.game] = { count: 0, value: 0 };
    }
    stats[item.game].count++;
    stats[item.game].value += item.value;
    return stats;
  }, {});

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My <span className="text-orange-400">Inventory</span>
              </h1>
              <p className="text-gray-400">Manage your skins and items from all games</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-2xl font-bold text-orange-400">{totalValue.toFixed(2)}₽</div>
              <div className="text-gray-400 text-sm">{mockInventory.length} items total</div>
            </div>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(gameStats).map(([game, stats]) => (
            <Card key={game} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{gameConfigs[game]?.mascot}</div>
                <div className="text-sm text-gray-400 mb-1">{gameConfigs[game]?.name}</div>
                <div className="text-lg font-bold text-orange-400">{stats.value.toFixed(0)}₽</div>
                <div className="text-xs text-gray-500">{stats.count} items</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Selection */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="value-high">Value: High to Low</SelectItem>
                <SelectItem value="value-low">Value: Low to High</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
                <SelectItem value="date">Date Obtained</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="tradeable">Tradeable</SelectItem>
                <SelectItem value="non-tradeable">Non-tradeable</SelectItem>
                <SelectItem value="csgo">CS:GO</SelectItem>
                <SelectItem value="minecraft">Minecraft</SelectItem>
                <SelectItem value="valorant">Valorant</SelectItem>
                <SelectItem value="legendary+">Legendary+</SelectItem>
                <SelectItem value="mythical">Mythical</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="common">Common</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selection Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
              <div className="text-white">
                <span className="font-semibold">{selectedItems.length}</span> items selected
                <span className="text-orange-400 ml-4 font-semibold">{selectedValue.toFixed(2)}₽</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedItems([])}
                  className="border-gray-600 text-gray-300 hover:bg-gray-600"
                >
                  Clear
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSellSelected}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Sell Selected
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredInventory.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors cursor-pointer ${
                selectedItems.includes(item.id) ? 'ring-2 ring-orange-500 border-orange-500' : ''
              }`}
              onClick={() => handleSelectItem(item.id)}
            >
              <CardHeader className="pb-2">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-orange-500 text-white text-xs">
                      {item.value}₽
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="text-lg" title={gameConfigs[item.game]?.name}>
                      {gameConfigs[item.game]?.mascot}
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className={`${getRarityColor(item.rarity)} text-xs`}>
                      {item.rarity}
                    </Badge>
                  </div>
                  {selectedItems.includes(item.id) && (
                    <div className="absolute inset-0 bg-orange-500/20 rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <h3 className="font-medium text-white text-sm truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{gameConfigs[item.game]?.name}</span>
                    <span className={`${item.tradeable ? 'text-green-400' : 'text-red-400'}`}>
                      {item.tradeable ? 'Tradeable' : 'Locked'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    From: {item.obtainedFrom}
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSellItem(item);
                      }}
                      disabled={!item.tradeable}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-xs"
                    >
                      <DollarSign className="w-3 h-3 mr-1" />
                      Sell
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({ title: "Shared!", description: "Item shared with community!" });
                      }}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs px-2"
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;