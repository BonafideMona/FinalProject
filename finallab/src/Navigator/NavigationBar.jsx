import React, { useState, useContext } from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Developers from "./Developers";
import Modal from "../Signup/Modal";
import Login from "../Signup/Login";
import Signup from "../Signup/Signup";
import { Link } from "react-router-dom";
import { UserContext } from "../Signup/UserContext";

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
  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <header className="bg-[#fefaf4] border-b border-[#d6c9b4] shadow-sm">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        {/* Center Section: Search */}
        {showSearch && (
          <div className="flex-1 px-6">
            <Search />
          </div>
        )}

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {showDevelopers && (
            <Link to="/DeveloperPage">
              <Developers />
            </Link>
          )}

          {showCart && <Cart />}

          {user && (
            <span className="text-sm font-medium text-[#5b4e40]">
              {user.accName}
            </span>
          )}
          <Profile />

        </div>
      </div>

      {/* Login/Signup Modal */}
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
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-lg font-semibold text-[#3d2f24] mb-3">Confirm Logout</h2>
          <p className="text-sm text-[#5b4e40] mb-4">Are you sure you want to log out?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancelLogout}
              className="px-4 py-2 rounded-md border border-[#d6c9b4] text-[#5b4e40] hover:bg-[#f6f1e7] transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 rounded-md bg-[#a1663b] text-white hover:bg-[#7f4f2f] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}

export default NavigationBar;
