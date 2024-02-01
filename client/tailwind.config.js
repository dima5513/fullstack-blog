/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                base: 'rgb(var(--bg-base))',
                inverted: 'rgb(var(--bg-inverted))',
                'fallback-1': ({ opacityValue }) =>
                    `rgb(var(--fallback-1),${opacityValue})`,
                'fallback-2': 'rgb(var(--fallback-2))',
                'primary-accent': 'rgb(var(--primary-accent))',
            },
            textColor: {
                base: 'rgb(var(--text))',
                inverted: 'rgb(var(--text-inverted))',
                secondary: 'rgb(var(--text-secondary))',
            },
            borderColor: {
                accent: 'currentColor',
                'secondary-outline-accent':
                    'rgb(var(--secondary-outline-accent))',
            },
            colors: {
                error: {
                    600: '#BC0000',
                    500: '#EA0000',
                    300: '#FF3D3D',
                    150: '#FF7A7A',
                    50: '#FFA3A3',
                },
                neutral: {
                    900: '#000000',
                    800: '#1A1A1A',
                    700: '#535353',
                    300: '#BFBFBF',
                    150: '#D8D8D8',
                    100: '#E6E6E6',
                    50: '#F4F4F4',
                },
            },
        },
    },
    plugins: [],
}
