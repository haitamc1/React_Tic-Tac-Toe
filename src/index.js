
import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import "./styles.css";
import Game from "./Game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);