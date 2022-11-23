/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        primary: "#19D3AE"
      },
      fontFamily: {
        "blackHan": "'Black Han Sans', sans-serif",
        "island":"'Island Moments', cursive",
        "lobster": "'Lobster', cursive",
        "opnSans":"'Open Sans', sans-serif",
        "payTone":"'Paytone One', sans-serif",
        "poppins":"'Poppins', sans-serif",
        "ubuntu":"'Ubuntu', sans-serif" 
      },
      colors:{
        primary: "#19D3AE"
      },
      backgroundSize: {
        'full': '100%',
      },
      boxShadow:{
        "insetShadow":"inset 0px -50px 150px white"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
}
