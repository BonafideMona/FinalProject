import React from "react"
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className="flex items-center bg-gray-100 rounded-2xl h-14 text-lg">
            <input type="text"
            placeholder="Search for more products"
             
            
            className="text-shadow-current h-10 w-65 rounded-2xl  ml-10 outline-none"/>
            <IoSearch size={25} color="gray" className="mr-8"/>
        </div>
    )
}

export default Search
