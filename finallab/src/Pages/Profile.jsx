import React from "react"
import { Link } from "react-router-dom";

function Profile() {
    return (
        <div>
            <p>Here is the profile page</p>
        <Link to ="/AddProductForm"> Click to Add Products</Link>
        </div>
    )
}

export default Profile;
