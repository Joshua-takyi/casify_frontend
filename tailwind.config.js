import { withUt } from "uploadthing/tw";
/** @type {import('tailwindcss').Config} */
export default withUt({
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#fdfdb5',
  				'100': '#f6f4ab',
  				'200': '#f4f082',
  				'300': '#f0e95f',
  				'400': '#ebee22',
  				'500': '#d2c600',
  				'600': '#c9bf00',
  				'700': '#a18c00',
  				'800': '#7a6c00',
  				'900': '#455900',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f7fafc',
  				'100': '#f2f4f7',
  				'200': '#e8e9ec',
  				'300': '#dedee0',
  				'400': '#85f593',
  				'500': '#7ad4a8',
  				'600': '#68a79a',
  				'700': '#4e8c7c',
  				'800': '#2d6e5e',
  				'900': '#0f4a4a',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#f7fbfc',
  				'100': '#e7faf0',
  				'200': '#d5f7f4',
  				'300': '#c6f0e9',
  				'400': '#50f194',
  				'500': '#3bd28b',
  				'600': '#2abf81',
  				'700': '#1b9a6f',
  				'800': '#0e8a5b',
  				'900': '#0a6e4d',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			text: {
  				'50': '#ffffff',
  				'100': '#f7fafc',
  				'200': '#e8e9ec',
  				'300': '#dedee0',
  				'400': '#242603',
  				'500': '#181b1e',
  				'600': '#090b0c',
  				'700': '#030303',
  				'800': '#020202',
  				'900': '#010101'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			manropeBold: ["var(--font-manropeBold)"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
});
