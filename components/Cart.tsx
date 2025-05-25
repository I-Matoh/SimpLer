import React from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: number, currentQuantity: number, increment: boolean) => {
    try {
      const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
      if (newQuantity >= 1) {
        updateQuantity(id, newQuantity);
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  if (!isOpen) return null;

  const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2" />
                Shopping Cart ({state.items.reduce((total, item) => total + item.quantity, 0)} items)
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {state.items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
                  <div className="mt-6">
                    <button
                      onClick={onClose}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, false)}
                            className="text-gray-500 hover:text-gray-600 p-1"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 text-gray-600">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, true)}
                            className="text-gray-500 hover:text-gray-600 p-1"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-gray-900">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
                    </p>
                  )}
                </div>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;