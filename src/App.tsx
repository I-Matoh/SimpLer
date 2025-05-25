import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import { Product } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing app:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize app'));
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleSelectProduct = (product: Product) => {
    try {
      setSelectedProduct(product);
      setActivePage('product');
    } catch (err) {
      console.error('Error in handleSelectProduct:', err);
      setError(err instanceof Error ? err : new Error('Failed to select product'));
    }
  };

  const handleBackToShop = () => {
    setSelectedProduct(null);
    setActivePage('shop');
  };

  const toggleCart = () => {
    try {
      setIsCartOpen(!isCartOpen);
    } catch (err) {
      console.error('Error in toggleCart:', err);
      setError(err instanceof Error ? err : new Error('Failed to toggle cart'));
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  const handleOrderComplete = () => {
    setActivePage('shop');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 p-4">
        <h1 className="text-red-600 text-2xl font-bold">Something went wrong</h1>
        <pre className="mt-4 p-4 bg-white rounded shadow overflow-auto">
          {error.message}
        </pre>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          setActivePage={setActivePage} 
          toggleCart={toggleCart} 
        />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={toggleCart}
          onCheckout={handleCheckout}
        />
        
        <main className="pt-16">
          {activePage === 'home' && (
            <HomePage 
              onShopNow={() => setActivePage('shop')} 
              onSelectProduct={handleSelectProduct} 
            />
          )}

          {activePage === 'shop' && (
            <ShopPage 
              onSelectProduct={handleSelectProduct} 
            />
          )}

          {activePage === 'about' && (
            <AboutPage />
          )}

          {activePage === 'contact' && (
            <ContactPage />
          )}

          {activePage === 'product' && selectedProduct && (
            <ProductDetail 
              product={selectedProduct}
              onBack={handleBackToShop}
            />
          )}

          {activePage === 'checkout' && (
            <CheckoutPage 
              onOrderComplete={handleOrderComplete}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App; 