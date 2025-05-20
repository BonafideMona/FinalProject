import React from "react";
import FarmLinkLogo from "../assets/FarmLinkLogo.png";

function Logo() {
  return (
    <div className="flex items-center">
      <img
        src={FarmLinkLogo}
        alt="FarmLink Logo"
        className="h-20 w-auto object-contain"
      />
    </div>
  );
}

export default Logo;
