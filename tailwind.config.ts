import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '15px'
      },
      screens: {
        default: '1200px'
      }
    },
    fontFamily: {
      roboto: ['var(--font-roboto)'],
      alegreya: ['var(--font-alegreya)']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        cupcake: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
          '--rounded-box': '4px',
          '--rounded-btn': '4px',
          '--rounded-badge': '1.9rem'
        }
      }
    ]
  }
}
export default config
