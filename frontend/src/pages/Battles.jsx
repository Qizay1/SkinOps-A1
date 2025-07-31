import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Sword, 
  Clock, 
  Users, 
  Trophy,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { mockActiveBattles, mockCompletedBattles } from '../mock';
import { useToast } from '../hooks/use-toast';

const Battles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();

  const handleJoinBattle = (battleId) => {
    toast({
      title: "Joined Battle!",
      description: "You have successfully joined the battle. Good luck!",
    });
  };

  const handleCreateBattle = () => {
    toast({
      title: "Battle Created!",
      description: "Your battle has been created and is waiting for players.",
    });
  };

  const filteredActiveBattles = mockActiveBattles.filter(battle =>
    battle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedBattles = mockCompletedBattles.filter(battle =>
    battle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Case Battles</h1>
            <p className="text-gray-400">Compete against other players and win valuable skins</p>
          </div>
          <Button 
            onClick={handleCreateBattle}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Battle
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search battles..."
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
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="value-high">Highest Value</SelectItem>
                <SelectItem value="value-low">Lowest Value</SelectItem>
                <SelectItem value="players">Most Players</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Battle Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600">
              Active Battles ({filteredActiveBattles.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600">
              Completed Battles ({filteredCompletedBattles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredActiveBattles.map((battle) => (
                <Card key={battle.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">{battle.name}</CardTitle>
                      <Badge variant={battle.status === 'active' ? 'default' : 'secondary'}>
                        {battle.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Battle Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {battle.players.length} players
                      </div>
                      <div className="flex items-center text-green-400 font-semibold">
                        <Trophy className="w-4 h-4 mr-1" />
                        ${battle.totalValue}
                      </div>
                      {battle.status === 'active' && (
                        <>
                          <div className="flex items-center text-orange-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {battle.timeLeft}s left
                          </div>
                          <div className="text-gray-400">
                            Round {battle.currentRound}/{battle.rounds}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Case Info */}
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={battle.case.image} 
                          alt={battle.case.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h4 className="text-white font-medium">{battle.case.name}</h4>
                          <p className="text-gray-400 text-sm">${battle.case.price} per case</p>
                        </div>
                      </div>
                    </div>

                    {/* Players */}
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Players:</p>
                      <div className="flex -space-x-2">
                        {battle.players.map((player) => (
                          <Avatar key={player.id} className="w-8 h-8 border-2 border-gray-700">
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback>{player.username[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {battle.status === 'waiting' && (
                          <div className="w-8 h-8 border-2 border-dashed border-gray-500 rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {battle.status === 'waiting' && (
                        <Button 
                          onClick={() => handleJoinBattle(battle.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Sword className="w-4 h-4 mr-2" />
                          Join Battle
                        </Button>
                      )}
                      {battle.status === 'active' && (
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Watch Live
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCompletedBattles.map((battle) => (
                <Card key={battle.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">{battle.name}</CardTitle>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Winner */}
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <span className="text-white font-medium">Winner: {battle.winner}</span>
                        </div>
                        <span className="text-green-400 font-semibold">${battle.totalValue}</span>
                      </div>
                    </div>

                    {/* Players with their results */}
                    <div className="space-y-2">
                      {battle.players.map((player) => (
                        <div key={player.id} className={`flex items-center justify-between p-2 rounded ${
                          player.isWinner ? 'bg-green-900/20' : 'bg-gray-700/50'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={player.avatar} />
                              <AvatarFallback className="text-xs">{player.username[0]}</AvatarFallback>
                            </Avatar>
                            <span className={`text-sm ${player.isWinner ? 'text-green-400' : 'text-gray-300'}`}>
                              {player.username}
                            </span>
                            {player.isWinner && <Trophy className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <span className={`text-sm font-medium ${
                            player.isWinner ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            ${player.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Battles;