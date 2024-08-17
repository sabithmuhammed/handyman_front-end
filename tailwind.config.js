/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                height: "height",
            },
            fontFamily: {
                open: ["Open Sans", "sans-serif"],
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            animation: {
                slideIn: "slideIn 0.5s ease-in-out forwards",
            },
        },
    },
    plugins: [],
};
