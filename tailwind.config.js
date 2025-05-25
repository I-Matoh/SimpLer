/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.{js,ts,jsx,tsx}',
    './main.{js,ts,jsx,tsx}',
    './types.{js,ts}',
    './components/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,jsx,tsx}',
    './context/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
