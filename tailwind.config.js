/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Define a custom grid template with a fixed sidebar width and flexible main content
                'sidebar': '250px 1fr', // Adjust '250px' as per your sidebar width
            },
        },
    },
    plugins: [],
};
