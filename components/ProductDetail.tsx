import React, { useState } from 'react';
import { Star, ArrowLeft, Minus, Plus, ShoppingCart, Heart, TruckIcon } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const { name, price, image, description, rating, reviews, inStock, category } = product;

  const handleAddToCart = () => {
    if (!inStock) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back to products</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <span className="text-sm text-blue-600 uppercase tracking-wider">{category}</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviews} reviews)</span>
            </div>
            
            <p className="text-3xl font-bold text-gray-900 mb-6">${price.toFixed(2)}</p>
            
            <p className="text-gray-700 mb-6">{description}</p>
            
            <div className="mb-6">
              <p className="flex items-center text-sm">
                <TruckIcon className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-600 font-medium">Free shipping</span>
                <span className="text-gray-600 ml-1">on orders over $50</span>
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="border border-gray-300 rounded-l-md p-2 focus:outline-none hover:bg-gray-100 transition-colors duration-200"
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </button>
                <span className="border-t border-b border-gray-300 py-2 px-4 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={incrementQuantity}
                  className="border border-gray-300 rounded-r-md p-2 focus:outline-none hover:bg-gray-100 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-md ${
                  inStock 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white font-medium transition-colors duration-200`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Heart className="h-5 w-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;