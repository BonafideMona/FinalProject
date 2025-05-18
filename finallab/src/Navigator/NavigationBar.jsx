import React, { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Support from "./Support";
import Modal from "../Signup/Modal";
import Login from "../Signup/Login";
import Signup from "../Signup/Signup";
import { Link } from "react-router-dom";

function NavigationBar() {
  const [authMode, setAuthMode] = useState(null); // "login" | "signup" | null
  const [user, setUser] = useState(null); // user = { name: "John Doe", ... }

  const closeModal = () => setAuthMode(null);

  return (
    <div>
      <div className="flex justify-between items-center mx-[50px] my-2">
        <Logo />
        <Search />

        <div className="flex items-center space-x-4">
          <Support />
          <Cart />

          {user ? (
            <>
              <span className="text-gray-800 font-medium">Welcome, {user.name}</span>
              <Link to="/profile">
                <Profile />
              </Link>
            </>
          ) : (
            <button
              onClick={() => setAuthMode("login")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={authMode !== null} onClose={closeModal}>
        {authMode === "login" ? (
          <Login
            onSwitchToSignup={() => setAuthMode("signup")}
            onLoginSuccess={(userData) => {
              setUser(userData);  // Save user on success
              closeModal();
            }}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setAuthMode("login")}
            onSignupSuccess={(userData) => {
              setUser(userData);
              closeModal();
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default NavigationBar;
