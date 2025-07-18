import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeProvider from "./theme/ColorModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <CssBaseline /> {/* Resets default styles based on theme */}
      <App />
    </ColorModeProvider>
  </React.StrictMode>
);