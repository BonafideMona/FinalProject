import React, { useState, useContext } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Support from "./Developers";
import Modal from "../Signup/Modal";
import Login from "../Signup/Login";
import Signup from "../Signup/Signup";
import { Link } from "react-router-dom";
import { UserContext } from "../Signup/UserContext";
import Developers from "./Developers";

function NavigationBar({
  showSearch = true,
  showDevelopers = true,
  showCart = true,
}) {
  const [authMode, setAuthMode] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useContext(UserContext);

  const closeModal = () => setAuthMode(null);

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-[50px] my-2">
        <Logo />

        {/* Conditionally render Search */}
        {showSearch && <Search />}

        <div className="flex items-center space-x-4">
          {/* Conditionally render Developers */}
          {showDevelopers && (
            <Link to="/DeveloperPage">
              <Developers />
            </Link>
          )}

          {/* Conditionally render Cart */}
          {showCart && <Cart />}

          {user ? (
            <>
              <span className="text-gray-700 font-medium">{user.accName}</span>
              <Link to="/profile">
                <Profile />
              </Link>
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

      {/* Login / Signup Modal */}
      <Modal isOpen={authMode !== null} onClose={closeModal}>
        {authMode === "login" ? (
          <Login
            onSwitchToSignup={() => setAuthMode("signup")}
            onLoginSuccess={closeModal}
          />
        ) : (
          <Signup
            onSwitchToLogin={() => setAuthMode("login")}
            onLoginSuccess={closeModal}
          />
        )}
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={showLogoutConfirm} onClose={cancelLogout}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={cancelLogout}
              className="px-4 py-2 rounded-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NavigationBar;
