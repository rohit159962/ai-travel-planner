export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        orbit: {
          'from': { transform: 'rotate(0deg) translateX(56px) rotate(0deg)' },
          'to': { transform: 'rotate(360deg) translateX(56px) rotate(-360deg)' },
        },
        progressBar: {
          'from': { width: '0%' },
          'to': { width: '100%' },
        },
      },
      animation: {
        'orbit': 'orbit 2.5s linear infinite',
        'orbit-1': 'orbit 2.8s linear infinite 0.6s',
        'orbit-2': 'orbit 3.1s linear infinite 1.2s',
        'orbit-3': 'orbit 3.4s linear infinite 1.8s',
        'progress': 'progressBar 10s linear infinite',
      },
    },
  },
  plugins: [],
}