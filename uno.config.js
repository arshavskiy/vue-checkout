import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      getCSS: () => `
        :root {
              --n-item-text-color-active: #2c2e30
        }
      `,
    }), // Basic utilities
    presetAttributify(), // Attribute-mode support (e.g., text="red")
    presetIcons() // Icon support
  ],
  // Optional: Add custom rules, shortcuts, or variants
  // rules: [
  //   ['custom-rule', { color: 'blue', 'font-size': '18px' }]
  // ],
  shortcuts: {
    'btn-placeOrder': 'px-4 py-2 font-size-16px rounded border-none bg-green-500 text-white hover:bg-green-700',
  }
});
