import { createTheme, adaptV4Theme } from '@mui/material/styles';


export const palette = {
  bluePrimary: "#0D71B9",
  buttonBlue: "#2DABE3",
  orangePrimary: "#F39323",
  orangeSecondary: "#FFD231",
  grayPrimary: "#606060",
  blackPrimary: "#18232B",
  gradient: "#0D71B9 & #8813B0",
  white: "#ffffff"
}


export const muiTheme = createTheme(adaptV4Theme({
  typography: {
    htmlFontSize: 10,
    lineHeight: "2rem",
    fontFamily: "Montserrat",
    // fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(','),
    fontSize: 8,
    h1: {
      fontSize: "2.5rem",
      fontWeight: "black"
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: "black"
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "black"
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: "bolder"
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: "bolder"
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: "bolder"
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: "bold"
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "bold"
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: "normal",
      lineHeight: 2,
    },
    body2: {
      fontSize: "0.5rem",
      fontWeight: "black",
      lineHeight: 2,
    },
    caption: {
      fontSize: "0.875rem",
      fontWeight: "normal",
      fontFamily: "italic"
    },
    overline: {
      fontSize: "2.25rem",
      fontWeight: "black"
    },
    button: {
      textTransform: "none",
    },
  },
}));