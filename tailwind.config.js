module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // enable dark mode
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      },
      backgroundImage:{
        'main': 'url("./components/main.jpeg")',
        'img1': 'url("./components/imgsuper.jpeg")',
        'img2': 'url("./components/like.jpeg")',
        'img3': 'url("./components/comment.jpeg")',
        'img4': 'url("./components/post1.jpeg")',
        'img5': 'url("./components/recommend2.png")',
        'img6': 'url("./components/announce1.avif")',
        'img7': 'url("./components/anno1.jpeg")',

      },
      colors: {
        gray:{
          1 : "#000000",
          2 : "#161618",
          cs : "rgba(10, 175, 230, 0)",
        }

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};