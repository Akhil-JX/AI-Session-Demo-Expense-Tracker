/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sail: {
          scope: '#0066CC',    // Phase 1: Scope (Blue)
          architect: '#00AA44', // Phase 2: Architect (Green)
          iterate: '#FF6600',   // Phase 3: Iterate (Orange)
          look: '#8B4513',      // Phase 4: Look (Brown)
        }
      }
    },
  },
  plugins: [],
}
