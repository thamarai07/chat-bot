import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import { StylesProvider, ThemeProvider } from '@mui/styles';
import { muiTheme } from "core/theme";
import { StyledEngineProvider } from '@mui/material/styles';


// const root = ReactDOM.createRoot(document.getElementById("root"));
ReactDOM.render(
  <>

    <StyledEngineProvider injectFirst>
      <StylesProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  </>,
  document.getElementById("root")
);
reportWebVitals();
