/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customBg: "#f4f7f6",
                customPrimary: "#6366f1",
                customCard: "#ffffff"
            }
        },
    },
    plugins: [],
}
