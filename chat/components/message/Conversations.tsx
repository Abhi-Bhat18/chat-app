import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import ConversationCard from "./ConversationCard";

const Conversations = () => {
  return (
    <div className="w-full p-2 space-y-5">
      {/* <--------------------Search Conversations----------------------> */}
      <div className="flex items-center w-full bg-gray-100 px-2 space-x-2 rounded-md">
        <BiSearchAlt />
        <input
          type="text"
          className="outline-none bg-gray-100 w-full px-2 py-1"
          placeholder="Search"
        />
      </div>
      {/* ------------------------- Conversations --------------------- */}
      <div className="space-y-5">
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
        <ConversationCard />
      </div>
    </div>
  );
};

export default Conversations;
