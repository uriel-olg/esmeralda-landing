import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { ShopProvider } from "./context/ShopContext";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ShopProvider>
          <App />
        </ShopProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
