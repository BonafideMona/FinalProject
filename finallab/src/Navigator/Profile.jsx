import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import Modal from "../Signup/Modal";
import Signup from "../Signup/Signup";
import Login from "../Signup/Login";

function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const isLoggedIn = false;

  return (
    <div className="relative mr-[100px]">
      <div
        className="bg-gray-200 rounded-2xl p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        <GoPerson size={25} />
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-20">
          {!isLoggedIn ? (
            <ul className="flex flex-col">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowLoginModal(true);
                  setShowMenu(false);
                }}
              >
                Log In
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowSignupModal(true);
                  setShowMenu(false);
                }}
              >
                Sign Up
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          )}
        </div>
      )}

      {/* Modals */}
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
