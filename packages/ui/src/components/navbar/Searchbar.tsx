import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Searchbar = () => {
  return (
    <div>
      <div className="flex space-x-3 items-center border-gray-400 border-[1px] px-3 py-1 rounded-lg">
        <BiSearchAlt className="text-lg"/>
        <input
          type="text"
          className="outline-none rounded-lg"
          placeholder="Search public channels"
        />
      </div>
    </div>
  );
};

export default Searchbar;
