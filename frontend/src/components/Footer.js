import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Heart, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <MapPin className="w-8 h-8 text-blue-400" />
                <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold">AI Travel Planner</span>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Create personalized, AI-powered travel itineraries that adapt to your preferences, 
              budget, and schedule. Experience the future of travel planning.
            </p>
            
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/planner" className="text-gray-300 hover:text-white transition-colors">
                  Plan Trip
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AI Travel Planner. All rights reserved.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-400 text-sm mr-2">Made with</span>
            <Heart className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-gray-400 text-sm">for travelers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;