import React from "react";
import Image from "next/image";

const gimKim =
  "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRc74yMkuR1wQcCdvpEtPocVlB2BZ_Vu3wkJKxBHqpfXYXdNgkJDwsz8-o1W20wd7Q4";
const ConversationCard = () => {
  return (
    <div className="flex w-full items-center space-x-2">
      <img
        alt="profile pic"
        src="https://image.cnbcfm.com/api/v1/image/107228941-1682027700192-_DSC5658.jpg?v=1682427601&w=740&h=416&ffmt=webp&vtcrop=y"
        className="rounded-full h-14 w-14 object-cover"
      />
      <div className="w-full border-b-[1px] border-gray-300 py-2">
        <p className="text-md flex justify-between items-center w-full">
          Abhishek Bhat <span className="text-xs">8:30 PM</span>
        </p>
        <p className="text-sm">Some messages from Abhishek</p>
      </div>
    </div>
  );
};

export default ConversationCard;
