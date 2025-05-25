#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️ Building the application..."
npm run build

# Optimize images
echo "🖼️ Optimizing images..."
find dist -type f -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -exec convert {} -strip -quality 85% {} \;

# Gzip static assets
echo "📦 Compressing static assets..."
find dist -type f -name "*.js" -o -name "*.css" -o -name "*.html" -exec gzip -k {} \;

echo "✅ Build completed successfully!"
echo "📂 Production files are ready in the dist/ directory"
echo "🌍 You can now deploy the contents of dist/ to your hosting provider" 