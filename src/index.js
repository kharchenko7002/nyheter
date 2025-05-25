// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // Убедись, что файл App.js существует и экспортирует компонент App
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
