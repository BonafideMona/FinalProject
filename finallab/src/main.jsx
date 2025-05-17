import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="180701498120-rhu9oh0r7e2bn232oiubv6pcd3iq019k.apps.googleusercontent.com">

      <App />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
