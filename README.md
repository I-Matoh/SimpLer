# SimpLer - Modern E-commerce Platform

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS. Features a clean, intuitive interface with advanced shopping features.

## Features

### Shopping Experience
- **Product Catalog** with advanced filtering:
  - Full-text search across product names and descriptions
  - Multi-category filtering
  - Price range filtering
  - Rating-based filtering
  - Stock status filtering
  - Multiple sorting options (featured, price, rating, name)

### Shopping Cart
- Real-time cart updates
- Quantity management
- Persistent cart storage
- Free shipping threshold calculation
- Quick checkout access

### Checkout Process
- Multi-step checkout flow:
  1. Shipping information
  2. Payment details
  3. Order confirmation
- Order summary with tax calculation
- Real-time total updates
- Form validation

### User Interface
- Responsive design for all screen sizes
- Modern, clean aesthetic
- Loading states and animations
- Error handling and boundaries
- Intuitive navigation
- Mobile-friendly filters and cart

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context
- **Error Handling**: React Error Boundary

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simpler.git
cd simpler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
simpler/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React Context providers
│   ├── services/          # Business logic and utilities
│   ├── types/             # TypeScript type definitions
│   ├── data/             # Mock data and constants
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── package.json         # Project dependencies and scripts
```

## Key Components

- `App.tsx`: Main application component with routing logic
- `Cart.tsx`: Shopping cart slide-over component
- `ProductGrid.tsx`: Product display grid with filtering
- `CheckoutPage.tsx`: Multi-step checkout process
- `ErrorBoundary.tsx`: Error handling wrapper
- `LoadingSpinner.tsx`: Loading state component

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern e-commerce best practices
- Icons provided by [Lucide](https://lucide.dev/)
- Built with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

## Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A hosting platform (e.g., Vercel, Netlify, or your own server)

### Production Build
1. Create a production build:
```bash
npm run build
```
This will create a `dist` directory with optimized production files.

2. Test the production build locally:
```bash
npm run preview
```
Visit `http://localhost:4173` to verify the production build.

### Deployment Options

#### Option 1: Vercel (Recommended)
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

#### Option 2: Netlify
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy to Netlify:
```bash
netlify deploy
```

#### Option 3: Manual Deployment
1. Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

2. Upload the contents of the `dist` directory to your hosting provider.

### Environment Variables
Make sure to set the following environment variables in your hosting platform:
- `VITE_API_URL`: Your API endpoint
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key (if using Stripe)
- `VITE_GA_TRACKING_ID`: Google Analytics tracking ID (if using GA)

### Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test all interactive features
- [ ] Check mobile responsiveness
- [ ] Verify API connections
- [ ] Test payment processing
- [ ] Monitor error logging
- [ ] Check analytics integration

### Performance Optimization
The production build includes:
- Code splitting and lazy loading
- Asset optimization
- Tree shaking
- Minification and compression
- Cache optimization

### Monitoring and Maintenance
- Set up error monitoring (e.g., Sentry)
- Configure performance monitoring
- Set up automated backups
- Schedule regular updates

For any deployment issues, please check the troubleshooting section or open an issue on GitHub.
