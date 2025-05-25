import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  setActivePage: (page: string) => void;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActivePage, toggleCart }) => {
  const { state } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const navItems = [
    { name: 'Home', action: () => setActivePage('home') },
    { name: 'Shop', action: () => setActivePage('shop') },
    { name: 'About', action: () => setActivePage('about') },
    { name: 'Contact', action: () => setActivePage('contact') },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setActivePage('home')}
              aria-label="Go to homepage"
            >
              TechShop
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8" role="menubar">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                role="menuitem"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Search, Cart, and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:block" role="search">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search products"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
              </div>
            </form>

            {/* Cart Icon */}
            <button 
              onClick={toggleCart}
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label={`Open cart with ${state.items.reduce((total, item) => total + item.quantity, 0)} items`}
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" aria-hidden="true">
                  {state.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button 
                onClick={() => setActivePage(isAuthenticated ? 'profile' : 'login')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                aria-label={isAuthenticated ? 'View profile' : 'Login or register'}
              >
                <User className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4" role="menu">
          <div className="pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                role="menuitem"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </button>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
                role="menuitem"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setActivePage('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                role="menuitem"
                aria-label="Login or register"
              >
                Login / Register
              </button>
            )}
            <form onSubmit={handleSearch} className="mt-4" role="search">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search products"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;