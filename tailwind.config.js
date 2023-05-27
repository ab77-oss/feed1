/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    
  ],
  theme: {
    extend: {
      backgroundImage :{
        'mobileBg':"url('../public/assets/suggestions/mobile/background-header.png')",
        'tabletBg':"url('../public/assets/suggestions/tablet/background-header.png')",
        'desktopBg':"url('../public/assets/suggestions/desktop/background-header.png')",
      }
    },
    colors: {
      'ghost_white': '#F7F8FD',
      'cotton_ball':'#F2F4FE',
      'venetian_red':'#AD1FEA',
      'royal_blue':'#4661E6',
      'american_blue': '#373F68',
      'white':'#FFFFFF',
      'jewel_cave':'#3A4374',
      'creamy_peach':'#F49F85',
      'blue_mana':'#62BCFA',
      'ocean_night':'#647196',
      'peri_blue':'#8397F8',
      'jasper':'#D73737',
      'gra':'#8C92B3',
      'Heliotrope':'#C75AF6',
      'Lavender_Blue':'#CFD7FF'
    }
  },
  variants: {
    extend: {
      display:['group-focus']
    },
  },
  plugins: [],
}

