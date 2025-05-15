import React from "react"
import { RiArrowDownSLine } from "react-icons/ri";

function ShopByDept() {
  return (
    <div className="flex mx-7 my-5 ">
      <div className="flex items-center mx-10">
        <h1>Shop by Departments</h1>
        <RiArrowDownSLine />
      </div>
      <ul className="flex">
        <li className="mx-5">Women</li>
        <li className="mx-5">Men</li>
        <li className="mx-5">Kids</li>
        <li className="mx-5">Accessories</li>
        <li className="mx-5">Pages</li>
      </ul>
    </div>
  );
}

export default ShopByDept;
