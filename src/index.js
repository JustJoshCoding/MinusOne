import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import ProManageContext from "./ProManageContext";

ReactDOM.render(
  <React.StrictMode>
    <ProManageContext>
      <App />
    </ProManageContext>
  </React.StrictMode>,
  document.getElementById("root")
);
