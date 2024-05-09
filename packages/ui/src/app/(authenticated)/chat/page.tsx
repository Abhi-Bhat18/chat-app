import Messaging from "@/components/Messaging";
import Conversations from "@/components/conversations";
import React from "react";

const Chat = () => {
  return (
    <main className="max-w-7xl flex mx-auto my-2 space-x-2 h-full">
      <div className="basis-1/4 border-[1px] border-gray-200 rounded-md h-[80vh] p-2 overflow-auto">
        <Conversations />
      </div>
      <div className="basis-3/4 overflow-auto h-[80vh] rounded-md border-gray-200 border-[1px] px-5 relative">
        <Messaging />
      </div>
    </main>
  );
};

export default Chat;
