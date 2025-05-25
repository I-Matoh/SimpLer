import React, { useState, useEffect } from 'react';
import { Slider, Search, Filter as FilterIcon } from 'lucide-react';
import { products } from '../data/products';
import { searchProducts, sortProducts, SearchFilters } from '../services/searchService';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onSelectProduct }) => {
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  const maxPrice = Math.max(...products.map(product => product.price));

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [minRating, setMinRating] = useState<number>(0);
  const [showInStock, setShowInStock] = useState<boolean | undefined>(undefined);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Apply filters
  useEffect(() => {
    const filters: SearchFilters = {
      query: searchQuery,
      categories: selectedCategories,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating,
      inStock: showInStock
    };

    let results = searchProducts(products, filters);
    results = sortProducts(results, sortBy);
    setFilteredProducts(results);
  }, [searchQuery, selectedCategories, priceRange, minRating, showInStock, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Shop</h1>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </form>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name</option>
          </select>

          {/* Mobile filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
          >
            <FilterIcon className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>${priceRange[0].toFixed(2)}</span>
                  <span>${priceRange[1].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Minimum Rating</h3>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>
              <select
                value={showInStock === undefined ? 'all' : showInStock ? 'in-stock' : 'out-of-stock'}
                onChange={(e) => {
                  const value = e.target.value;
                  setShowInStock(value === 'all' ? undefined : value === 'in-stock');
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock Only</option>
                <option value="out-of-stock">Out of Stock Only</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setPriceRange([0, maxPrice]);
                setMinRating(0);
                setShowInStock(undefined);
                setSortBy('featured');
              }}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} onSelectProduct={onSelectProduct} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 