/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          1: "#22223B", // Deep dark slate navy
          2: "#4A4E69", // Muted slate blue-purple
          3: "#9A8C98", // Muted mauve slate
          4: "#C9ADA7", // Warm sand / rose-taupe
          5: "#F2E9E4"  // Warm alabaster cream
        },
        obsidian: "#22223B",
        carbon: "#2A2A44",
        "carbon-light": "#373854",
        hairline: "#4A4E69",
        "hairline-light": "#5D6180",
        amber: {
          accent: "#C9ADA7",
          muted: "rgba(201, 173, 167, 0.15)",
          border: "rgba(201, 173, 167, 0.35)"
        },
        cyan: {
          accent: "#F2E9E4",
          muted: "rgba(242, 233, 228, 0.12)",
          border: "rgba(242, 233, 228, 0.28)"
        },
        slate: {
          muted: "#C9ADA7",
          subtle: "#9A8C98"
        }
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
