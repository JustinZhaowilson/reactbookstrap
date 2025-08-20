# 1. Install dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# 2. Create tailwind.config.js
@"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@ | Out-File -FilePath "tailwind.config.js" -Encoding utf8

# 3. Create postcss.config.js
@"
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
"@ | Out-File -FilePath "postcss.config.js" -Encoding utf8

# 4. Update src/index.css
@"
@import "tailwindcss";
"@ | Out-File -FilePath "src/index.css" -Encoding utf8

Write-Host "Tailwind CSS has been installed and configured."
