import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    category: "audio",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true
  }, 
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Track your fitness goals with our advanced smart watch. Monitors heart rate, sleep patterns, and activity levels with a 7-day battery life.",
    category: "wearables",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Ultra HD 4K Monitor",
    price: 499.99,
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Enhance your viewing experience with our Ultra HD 4K monitor. Features vibrant colors, wide viewing angles, and adjustable stand for maximum comfort.",
    category: "computers",
    rating: 4.7,
    reviews: 56,
    inStock: true
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Take your music anywhere with our waterproof portable speaker. Delivers rich bass and clear highs with 12-hour playback time.",
    category: "audio",
    rating: 4.5,
    reviews: 78,
    inStock: true
  },
  {
    id: 5,
    name: "Professional Digital Camera",
    price: 899.99,
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Capture stunning photos and videos with our professional-grade digital camera. Features 24MP sensor, 4K video, and interchangeable lenses.",
    category: "photography",
    rating: 4.9,
    reviews: 42,
    inStock: false
  },
  {
    id: 6,
    name: "Gaming Laptop",
    price: 1299.99,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience gaming like never before with our high-performance laptop. Equipped with the latest graphics card, fast processor, and cooling technology.",
    category: "computers",
    rating: 4.7,
    reviews: 63,
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Charge your devices effortlessly with our sleek wireless charging pad. Compatible with all Qi-enabled devices.",
    category: "accessories",
    rating: 4.4,
    reviews: 112,
    inStock: true
  },
  {
    id: 8,
    name: "Smart Home Security Camera",
    price: 179.99,
    image: "https://images.pexels.com/photos/62286/pexels-photo-62286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Keep your home safe with our smart security camera. Features motion detection, night vision, and live streaming to your phone.",
    category: "smart home",
    rating: 4.6,
    reviews: 94,
    inStock: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
