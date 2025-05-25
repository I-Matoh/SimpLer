import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '../data/products';

interface FeaturedProductsProps {
  onViewAll: () => void;
  onSelectProduct: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onViewAll, onSelectProduct }) => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <button
            onClick={onViewAll}
            className="text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors duration-200"
          >
            View all
            <ArrowRight className="ml-1 h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onSelectProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;