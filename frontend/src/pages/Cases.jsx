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
  Star,
  Eye
} from 'lucide-react';
import { mockCases, getRarityColor } from '../mock';
import { useToast } from '../hooks/use-toast';

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCase, setSelectedCase] = useState(null);
  const { toast } = useToast();

  const handleOpenCase = (caseItem) => {
    // Simulate case opening with random item
    const randomItem = caseItem.items[Math.floor(Math.random() * caseItem.items.length)];
    toast({
      title: "Case Opened!",
      description: `You got: ${randomItem.name} worth $${randomItem.value}!`,
    });
  };

  const handlePreviewCase = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const filteredCases = mockCases.filter(caseItem =>
    caseItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Cases</h1>
          <p className="text-gray-400">Open cases and discover rare skins and items</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
              <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors group">
              <CardHeader className="pb-3">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 text-white font-semibold">
                      ${caseItem.price}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-gray-900/80 text-white">
                      {caseItem.items.length} items
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <CardTitle className="text-lg text-white mb-1">{caseItem.name}</CardTitle>
                  <p className="text-gray-400 text-sm">Contains rare and valuable skins</p>
                </div>

                {/* Preview of items */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Featured Items:</p>
                  <div className="space-y-1">
                    {caseItem.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className={`${getRarityColor(item.rarity)} truncate max-w-[120px]`}>
                          {item.name}
                        </span>
                        <span className="text-green-400 font-medium">${item.value}</span>
                      </div>
                    ))}
                    {caseItem.items.length > 2 && (
                      <p className="text-xs text-gray-500">+{caseItem.items.length - 2} more items</p>
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
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handleOpenCase(caseItem)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <Package className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Preview Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedCase.name}</h2>
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
                    <h3 className="text-lg font-semibold text-white">Contains {selectedCase.items.length} items</h3>
                    <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                      ${selectedCase.price}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {selectedCase.items.map((item, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${getRarityColor(item.rarity)}`}>
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 capitalize">{item.rarity}</span>
                            <span className="text-green-400 font-semibold">${item.value}</span>
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
                  <Button 
                    onClick={() => {
                      handleOpenCase(selectedCase);
                      setSelectedCase(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Open Case - ${selectedCase.price}
                  </Button>
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