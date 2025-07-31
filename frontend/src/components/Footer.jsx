import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Shield, Users, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SkinOps</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              The ultimate multi-game case opening platform. Discover rare skins and items from your favorite games.
            </p>
            <div className="flex space-x-2">
              <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                18+
              </div>
              <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                Fair Play
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/games" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Browse Games
              </Link>
              <Link to="/cases" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                All Cases
              </Link>
              <Link to="/leaderboard" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Leaderboard
              </Link>
              <Link to="/payment" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Deposit Funds
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Fair Play Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-400 text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@skinops.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>24/7 Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Secure & Fair</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 SkinOps. All rights reserved. 
            </div>
            <div className="text-gray-400 text-sm mt-2 md:mt-0">
              Responsible Gaming • 18+ Only • Play Responsibly
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;