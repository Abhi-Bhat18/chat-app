import React from "react";
import Image from "next/image";
const profileUrl =
  "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Conversation = () => {
  return (
    <div className="flex space-x-2 border-b-[1px] border-gray-200 p-2 cursor-pointer">
      <Image
        width={50}
        height={50}
        src={profileUrl}
        alt="Profile"
        className="rounded-full h-12 w-12 object-cover"
      />
      <div className="w-full">
        <div className="flex w-full justify-between ">
          <p className="font-medium">Abhishek Bhat</p>
          <p className="text-xs">8:19</p>
        </div>
        <p className="text-sm">Message from Melissa</p>
      </div>
    </div>
  );
};

export default Conversation;
