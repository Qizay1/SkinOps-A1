import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Package, 
  ArrowLeft,
  RotateCcw,
  Share2,
  Star,
  Zap
} from 'lucide-react';
import { allCasesFlat, gameConfigs, getRarityColor, mockUser } from '../mock';
import { useToast } from '../hooks/use-toast';

const CaseOpening = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [canOpen, setCanOpen] = useState(true);

  const caseItem = allCasesFlat.find(c => c.id === caseId);
  
  useEffect(() => {
    if (!caseItem) {
      navigate('/cases');
    }
  }, [caseItem, navigate]);

  if (!caseItem) {
    return <div>Loading...</div>;
  }

  const gameConfig = gameConfigs[caseItem.game];

  const handleOpenCase = () => {
    if (!canOpen || mockUser.balance < caseItem.price) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${caseItem.price}₽ to open this case.`,
        variant: "destructive"
      });
      return;
    }

    setIsOpening(true);
    setCanOpen(false);
    setAnimationProgress(0);

    // Animate progress
    const progressInterval = setInterval(() => {
      setAnimationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Select random item after animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * caseItem.items.length);
      const wonItem = caseItem.items[randomIndex];
      setOpenedItem(wonItem);
      setIsOpening(false);
      
      toast({
        title: "Case Opened!",
        description: `You won: ${wonItem.name} worth ${wonItem.value}₽!`,
      });

      // Update user balance (mock)
      mockUser.balance -= caseItem.price;
      mockUser.balance += wonItem.value;
    }, 3000);
  };

  const handleOpenAnother = () => {
    setOpenedItem(null);
    setCanOpen(true);
    setAnimationProgress(0);
  };

  const handleShare = () => {
    if (openedItem) {
      toast({
        title: "Shared!",
        description: "Your winning has been shared with the community!",
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to={`/games/${caseItem.game}`}>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {gameConfig?.name} Cases
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="text-4xl">{gameConfig?.mascot}</div>
              <div>
                <h1 className="text-3xl font-bold text-white">{caseItem.name}</h1>
                <p className="text-gray-400">{gameConfig?.name}</p>
              </div>
            </div>
            <Badge className="bg-orange-500 text-white text-lg px-4 py-2">
              {caseItem.price.toLocaleString()}₽
            </Badge>
          </div>
        </div>

        {/* Case Opening Area */}
        <div className="text-center mb-8">
          {!openedItem ? (
            <Card className={`bg-gray-800 border-gray-700 max-w-md mx-auto ${isOpening ? 'animate-pulse' : ''}`}>
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.name}
                    className={`w-48 h-48 object-cover rounded-lg mx-auto ${isOpening ? 'animate-spin' : ''}`}
                  />
                  {isOpening && (
                    <div className="absolute inset-0 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-12 h-12 text-orange-400 animate-bounce" />
                    </div>
                  )}
                </div>
                
                {isOpening && (
                  <div className="mb-6">
                    <div className="text-orange-400 font-semibold mb-2">Opening Case...</div>
                    <Progress value={animationProgress} className="h-2" />
                  </div>
                )}
                
                <Button 
                  onClick={handleOpenCase}
                  disabled={!canOpen || isOpening}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600"
                >
                  {isOpening ? (
                    <>
                      <Package className="w-5 h-5 mr-2 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5 mr-2" />
                      Open Case - {caseItem.price.toLocaleString()}₽
                    </>
                  )}
                </Button>
                
                <div className="mt-4 text-sm text-gray-400">
                  Your balance: {mockUser.balance.toLocaleString()}₽
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className={`bg-gray-800 border-2 max-w-md mx-auto ${getRarityColor(openedItem.rarity)}`}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">🎉 Congratulations! 🎉</div>
                  <div className="mb-6">
                    <img 
                      src={openedItem.image} 
                      alt={openedItem.name}
                      className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-white mb-2">{openedItem.name}</h3>
                    <Badge className={getRarityColor(openedItem.rarity)}>
                      {openedItem.rarity}
                    </Badge>
                    <div className="text-2xl font-bold text-orange-400 mt-2">
                      {openedItem.value.toLocaleString()}₽
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleOpenAnother}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Open Another
                    </Button>
                    <Button 
                      onClick={handleShare}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Case Contents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Possible Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {caseItem.items.map((item, index) => (
              <Card key={index} className={`bg-gray-800 border-gray-700 ${getRarityColor(item.rarity)}`}>
                <CardContent className="p-4 text-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mx-auto mb-2"
                  />
                  <h4 className="text-white font-medium text-sm mb-1 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className={getRarityColor(item.rarity)}>
                      {item.rarity}
                    </Badge>
                    <span className="text-orange-400 font-semibold">{item.value}₽</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Cases from Same Game */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            More {gameConfig?.name} Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allCasesFlat
              .filter(c => c.game === caseItem.game && c.id !== caseItem.id)
              .slice(0, 4)
              .map((otherCase) => (
                <Card key={otherCase.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors">
                  <CardContent className="p-4">
                    <img 
                      src={otherCase.image} 
                      alt={otherCase.name}
                      className="w-full h-24 object-cover rounded mb-3"
                    />
                    <h4 className="text-white font-medium text-sm mb-2 truncate">
                      {otherCase.name}
                    </h4>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-orange-500 text-white text-xs">
                        {otherCase.price.toLocaleString()}₽
                      </Badge>
                      <span className="text-gray-400 text-xs">{otherCase.items.length} items</span>
                    </div>
                    <Link to={`/case/${otherCase.id}`}>
                      <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                        Open Case
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseOpening;