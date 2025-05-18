import React, { useState, useContext } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Support from "./Support";
import Modal from "../Signup/Modal";
import Login from "../Signup/Login";
import Signup from "../Signup/Signup";
import { Link } from "react-router-dom";
import { UserContext } from "../Signup/UserContext"; // adjust path as needed

function NavigationBar() {
  const [authMode, setAuthMode] = useState(null);
  const { user, logout } = useContext(UserContext);

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
              <span className="text-gray-700 font-medium">{user.accName}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
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
            onLoginSuccess={closeModal}
          />
        ) : (
          <Signup onSwitchToLogin={() => setAuthMode("login")} />
        )}
      </Modal>
    </div>
  );
}

export default NavigationBar;
