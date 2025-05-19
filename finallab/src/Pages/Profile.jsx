import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar"; // Make sure the path is correct

function Profile() {
  return (
    <div>
      <NavigationBar />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Here is the profile page</h1>
        <Link
          to="/AddProductForm"
          className="text-blue-600 hover:underline"
        >
          Click to Add Products
        </Link>
      </div>
    </div>
  );
}

export default Profile;
