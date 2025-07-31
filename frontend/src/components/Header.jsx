import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { 
  Package, 
  Trophy,
  User,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
  Gamepad2,
  Plus,
  Gift
} from 'lucide-react';
import { mockUser } from '../mock';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Games', path: '/games', icon: Gamepad2 },
    { name: 'All Cases', path: '/cases', icon: Package },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SkinOps</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-orange-400 bg-orange-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Balance */}
            <div className="hidden sm:flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
              <Wallet className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-semibold">{mockUser.balance.toLocaleString()}₽</span>
            </div>

            {/* Deposit Button */}
            <Link to="/payment">
              <Button size="sm" className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Deposit
              </Button>
            </Link>

            {/* Welcome Case (if available) */}
            {mockUser.hasWelcomeCase && (
              <Button size="sm" variant="outline" className="hidden sm:flex border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white">
                <Gift className="w-4 h-4 mr-1" />
                Gift
              </Button>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-1 hover:bg-gray-800">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback>{mockUser.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white">{mockUser.username}</div>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">
                      Level {mockUser.level}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/inventory" className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Inventory</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/payment" className="flex items-center space-x-2">
                    <Wallet className="w-4 h-4" />
                    <span>Payments</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-red-400">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-orange-400 bg-orange-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-gray-800 mt-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <Wallet className="w-4 h-4" />
                    <span className="font-semibold">{mockUser.balance.toLocaleString()}₽</span>
                  </div>
                  <Link to="/payment">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Deposit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;