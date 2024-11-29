import React, { useState } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">HabitHero</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/tasks" className="text-gray-700 hover:text-indigo-600">Tasks</Link>
            <Link to="/rewards" className="text-gray-700 hover:text-indigo-600">Rewards</Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-indigo-600">Leaderboard</Link>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700">Login</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Home</Link>
            <Link to="/tasks" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Tasks</Link>
            <Link to="/rewards" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Rewards</Link>
            <Link to="/leaderboard" className="block px-3 py-2 text-gray-700 hover:text-indigo-600">Leaderboard</Link>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 text-indigo-600 hover:text-indigo-700">Login</button>
              <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;