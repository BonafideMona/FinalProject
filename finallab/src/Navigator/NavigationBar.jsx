import React from "react";
import Cart from "./Cart";
import Logo from "./Logo";
import Profile from "./Profile";
import Search from "./Search";
import Support from "./Support";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <div className="flex justify-between items-center mx-[50px] my-2">
        <Logo />
        <Search />

        <div className="flex items-center justify-between">
          <Support />
          <Link to="/profile">
            <Profile />
          </Link>

          <Cart />
        </div>
        {/* <ShopByDept /> */}
      </div>
    </div>
  );
}

export default NavigationBar;
