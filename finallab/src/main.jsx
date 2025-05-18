import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.jsx";
import { UserProvider } from "./Signup/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "658901072922-9jt0qlj7ark87v701khufsrvbpkkroi1.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {/* <App /> */}
    <UserProvider>
      <App />
    </UserProvider>
    ;
    </GoogleOAuthProvider>
  </StrictMode>
);
