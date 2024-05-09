import React from "react";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";

const profileUrl =
  "https://hips.hearstapps.com/hmg-prod/images/sadie-sink-attends-the-whale-premiere-during-the-2022-news-photo-1663276797.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between border-gray-200 border-b-[1px] py-5 sticky top-0 bg-white">
      <div className="flex items-center space-x-2 z-1">
        <Image
          width={50}
          height={50}
          className="h-14 w-14 rounded-full"
          src={profileUrl}
          alt="Profile"
        />
        <div className="justify-center">
          <p className="font-medium">Sadie Sink</p>
          <p className="text-sm">stranger_05</p>
        </div>
      </div>
      <div className="cursor-pointer">
        <SlOptions />
      </div>
    </div>
  );
};

export default ChatHeader;
