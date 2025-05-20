import React, { useState, useContext, useRef, useEffect } from "react";
import { GoPerson } from "react-icons/go";
import Modal from "../Signup/Modal";
import Signup from "../Signup/Signup";
import Login from "../Signup/Login";
import { Link } from "react-router-dom";
import { UserContext } from "../Signup/UserContext";

function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useContext(UserContext);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 bg-gray-200 rounded-3xl hover:bg-gray-300 transition"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <GoPerson size={25} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <ul className="text-sm text-gray-700">
            {user && (
              <li className="hover:bg-gray-100">
                <Link
                  to="/profile"
                  onClick={() => setShowDropdown(false)}
                  className="block px-4 py-2"
                >
                  Profile
                </Link>
              </li>
            )}


            {user ? (
              <li className="hover:bg-gray-100">
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="hover:bg-gray-100">
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2"
                  >
                    Login
                  </button>
                </li>
                <li className="hover:bg-gray-100">
                  <button
                    onClick={() => {
                      setShowSignupModal(true);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2"
                  >
                    Signup
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      <Modal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <Signup />
      </Modal>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login />
      </Modal>
    </div>
  );
}

export default Profile;
