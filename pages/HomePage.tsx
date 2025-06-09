import React, { useEffect } from 'react';
import { Product } from '../types';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import Benefits from '../components/Benefits';

interface HomePageProps {
  onShopNow: () => void;
  onSelectProduct: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onShopNow, onSelectProduct }) => {
  useEffect(() => {
    console.log('HomePage mounted');
  }, []);

  console.log('HomePage rendering');

  return (
    <div className="min-h-screen">
      <Hero onShopNow={onShopNow} />
      <FeaturedProducts onViewAll={onShopNow} onSelectProduct={onSelectProduct} />
      <Benefits />
      <Newsletter />
    </div> 
  );
};

export default HomePage;
