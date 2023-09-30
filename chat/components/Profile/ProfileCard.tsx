import React from "react";
import { createOrGetConversation } from "../../actions/chatActioins";

interface Props {
  _id: string;
  imgUrl: string;
  fullName: string;
  userName: string;
  message?: string;
}

const ProfileCard: React.FC<Props> = ({ _id, fullName, imgUrl, userName }) => {
  const handleClick = () => {
    const response = createOrGetConversation(_id);
    console.log(response);
  };

  return (
    <div className="flex w-full items-center space-x-2 cursor-pointer">
      <img
        alt="profile pic"
        src={`${imgUrl}`}
        className="rounded-full h-12 w-12 object-cover"
      />
      <div className="w-full border-b-[1px] border-gray-300 py-2">
        <p className="text-md flex justify-between items-center w-full">
          {fullName} <span className="text-xs"></span>
        </p>
        <p className="text-sm">@{userName}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
