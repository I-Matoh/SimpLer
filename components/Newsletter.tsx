import React, { useState } from 'react';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError(null);
    setSubscribeSuccess(false);

    if (!validateEmail(email)) {
      setSubscribeError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeSuccess(true);
      setEmail('');
    } catch (err) {
      setSubscribeError('Failed to subscribe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-4 lg:mb-0">
              Stay updated with the latest products, exclusive offers, and tech news.
            </p>
          </div>
          <div className="lg:w-1/2">
            <form onSubmit={handleSubscribe} className="sm:flex" noValidate>
              <div className="flex-1">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribeError(null);
                    setSubscribeSuccess(false);
                  }}
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  aria-invalid={subscribeError ? 'true' : 'false'}
                  aria-describedby={subscribeError ? 'newsletter-error' : undefined}
                />
                {subscribeError && (
                  <p id="newsletter-error" className="mt-2 text-sm text-red-200" role="alert">
                    {subscribeError}
                  </p>
                )}
                {subscribeSuccess && (
                  <p className="mt-2 text-sm text-green-200" role="alert">
                    Thank you for subscribing!
                  </p>
                )}
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-blue-100">
              We care about your data. Read our{' '}
              <a href="#" className="text-white underline hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 