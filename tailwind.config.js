/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in the src directory
  ],
  safelist: [
    'bg-yellow-300',    // For ChatWidget.tsx testing
    'text-green-500',   // For ChatWidgetButton.tsx testing
    'border-green-500', // For ChatWidgetButton.tsx testing
    'underline',          // Existing class from original test
    'border-8',           // Existing class from original test
    // Add any other classes that need to be generated regardless of content scanning
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
