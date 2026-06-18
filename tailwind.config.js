var config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                display: ['Merriweather', 'serif'],
                body: ['Source Sans 3', 'sans-serif'],
            },
            colors: {
                brand: {
                    deep: '#143642',
                    accent: '#f4a261',
                    light: '#f8f5ef',
                    sky: '#4f7c8a',
                },
            },
            boxShadow: {
                soft: '0 18px 40px -24px rgba(20, 54, 66, 0.45)',
            },
        },
    },
    plugins: [],
};
export default config;
