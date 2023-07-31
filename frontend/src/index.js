import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import "./styles/main.scss";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
