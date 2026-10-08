import React from "react";
import ReactDOM from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleSheetManager enableVendorPrefixes>
      <App />
    </StyleSheetManager>
  </React.StrictMode>,
);
