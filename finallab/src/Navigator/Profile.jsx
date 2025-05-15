import React, { useState } from "react";
import { GoPerson } from "react-icons/go";

function Profile() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  // You can later enhance this with actual login state.
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
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg ">
          {!isLoggedIn ? (
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log In</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Up</li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
