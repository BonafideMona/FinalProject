import React, { useState } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Support from "./Support";
import Modal from "../Signup/Modal";
import Login from "../Signup/Login";
import Signup from "../Signup/Signup"; // ← Add this import
import { Link } from "react-router-dom";

function NavigationBar() {
  const [authMode, setAuthMode] = useState(null); // null, "login", or "signup"

  const closeModal = () => setAuthMode(null);

  return (
    <div>
      <div className="flex justify-between items-center mx-[50px] my-2">
        <Logo />
        <Search />

        <div className="flex items-center space-x-4">
          <Support />
          <Link to="/profile">
            <Profile />
          </Link>
          <Cart />

          <button
            onClick={() => setAuthMode("login")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>

      <Modal isOpen={authMode !== null} onClose={closeModal}>
        {authMode === "login" ? (
          <Login
            onSwitchToSignup={() => setAuthMode("signup")}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </Modal>
    </div>
  );
}

export default NavigationBar;
