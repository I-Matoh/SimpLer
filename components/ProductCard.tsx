import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { name, price, image, rating, reviews, inStock } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`p-2 rounded-full ${
              inStock 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            <ShoppingCart className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;