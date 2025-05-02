import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Store_context_provider from "./context/storecontext.jsx"; // Correct import name

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Store_context_provider> {/* Use the correct component name */}
        <App />
      </Store_context_provider>
    </BrowserRouter>
  
);
