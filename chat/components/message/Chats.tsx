import React from "react";
import Image from "next/image";
import profile from "../../public/abhishek.jpeg";
import Message from "./Message";
import MessageInput from "./MessageInput";

const Chats = () => {
  return (
    <>
      <div className="w-full space-y-5">
        <div className="w-full bg-white px-5 py-2 shadow-sm flex space-x-2">
          <Image
            src={profile}
            alt="Profile pic"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p>Abhishek Bhat</p>
            <p>This is my status</p>
          </div>
        </div>
        <div className="px-5 space-y-2">
          <Message/>
          <Message />
        </div>
      </div>
     <MessageInput/>
    </>
  );
};

export default Chats;
