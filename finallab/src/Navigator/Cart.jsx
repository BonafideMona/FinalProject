import React from "react"
import { RiArrowDropDownFill } from "react-icons/ri";

function Cart() {
    return (
        <div>
            <div className="flex items-center">
            <h1>Your Cart</h1>
            <RiArrowDropDownFill/>
            </div>
            <h1 className="font-bold">$0.00</h1>
           
        </div>
    )
}

export default Cart
