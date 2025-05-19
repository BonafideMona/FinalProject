import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar";

function Profile() {
  return (
    <div>
      {/* Hide Search, Developers, and Cart here */}
      <NavigationBar showSearch={false} showDevelopers={false} showCart={false} />

      <div className="p-4 max-w-3xl mx-auto">
        <p className="mb-4 text-lg font-medium">Here is the profile page</p>
        <Link to="/AddProductForm" className="text-blue-600 hover:underline">
          Click to Add Products
        </Link>
      </div>
    </div>
  );
}

export default Profile;
