import React from "react";
import Image from "next/image";

const profileImg =
  "https://hips.hearstapps.com/hmg-prod/images/sadie-sink-attends-the-whale-premiere-during-the-2022-news-photo-1663276797.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*";

interface Props {
  user?: string;
  message?: string;
}

const Message: React.FC<Props> = ({ user, message }) => {
  const flexDirection = user ? "flex-row" : "flex-row-reverse";

  return (
    <div className={`my-5 flex space-x-2 justify-start ${flexDirection}`}>
      <Image
        width={50}
        height={50}
        className="w-10 h-10 rounded-full"
        src={profileImg}
        alt=""
      />
      <div className="rounded-md px-2 max-w-[80%] ">
        <p className="bg-gray-200 p-2 rounded-md">
          Databases have tables and indexes stored in files. As you create rows,
          the database system writes to data pages in memory which is then
          written to data files on disk. There is a problem though, what happens
          if you lose power half-way through writing to the file? As the
          database starts back up we have corrupted files. We quickly realize
          that we need something else to save us from crashes and power loss,
          and that is WAL (Write-ahead log) or Redo log.
        </p>
        <p className="text-xs text-right">8:20 PM</p>
      </div>
    </div>
  );
};

export default Message;
