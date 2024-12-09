/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#003366',
				'secondary': '#66b2ff',
				'highlight': '#2ecc71',
				'neutral': '#e0e0e0'
			}
		},
	},
	plugins: [],
}
