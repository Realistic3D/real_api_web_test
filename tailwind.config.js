/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './**/*.{html,js}',
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        '!./node_modules',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            width: {
                '380': '380px',
            },
            colors: {
                'sc-dark-l': '#171717',
                'sc-dark2-l': '#494848',
                'sc-dark2': '#3b3b3b',
                'sc-dark': '#0d0d0d',
            },
        },
    },
    plugins: [],
}
