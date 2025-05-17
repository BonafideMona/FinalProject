import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import Modal from "../Signup/Modal";
import Signup from "../Signup/Signup";
import Login from "../Signup/Login";

function Profile() {
    return (
        <div className="mr-[100px] bg-gray-200 rounded-2xl "> 
            <GoPerson size={25}/>
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
