import React from "react"
import Cart from "./Cart"
import Logo from "./Logo"
import Profile from "./Profile"
import Search from "./Search"
import Support from "./Support"

function NavigationBar() {
    return (
        <div>
              <div className="flex justify-between items-center mx-[50px] my-2">
            <Logo /> 
            <Search />
           
            <div className="flex items-center justify-between">
            <Support />
            <Profile />
            <Cart />
            </div>
            {/* <ShopByDept /> */}


            
        </div>
        </div>
    )
}

export default NavigationBar
