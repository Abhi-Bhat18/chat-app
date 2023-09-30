import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import ConversationCard from "./ConversationCard";
import { getAllUsers } from "@/actions/chatActioins";
import ProfileCard from "../Profile/ProfileCard";
import useAuth from "@/hooks/useAuth";

const Conversations = () => {
  const [data, setData] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      console.log(response?.data);
      if (response?.success) setData(response.data);
      else alert("Something went wrong");
    };

    fetchUsers();
  }, []);

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
        
      </div>

      {/* <------------------------------ Users ----------------------------------> */}
      <div>
        <p>Connect with Users</p>
        {data.map((profile, index) => {
          if (profile._id != user?._id) {
            return (
              <ProfileCard
                fullName={profile.fullName}
                userName={profile.userName}
                imgUrl={profile.imgUrl}
                _id={profile._id}
                key={index}
              ></ProfileCard>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Conversations;
