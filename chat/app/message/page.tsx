import React from "react";
import Conversations from "@/components/message/Conversations";
import Chats from "@/components/message/Chats";
const message = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-gray-100 flex">
        <div className="h-screen overflow-y-auto bg-gray-50 shadow-lg basis-[30%]">
          <Conversations />
        </div>
        <div className="basis-[70%] h-screen overflow-y-auto relative">
          <Chats/>
        </div>
      </div>
    </div>
  );
};

export default message;
