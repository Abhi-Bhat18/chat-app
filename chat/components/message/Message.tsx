import React from "react";
interface Props {
  message ? : string,
  time : string,
  sentBy : string,
  read : boolean,
  fileUrl ? : string,
  conversationId : string
}


const Message = () => {


  return (
    <div className="w-full flex justify-start">
      <div className="max-w-[65%] p-2 bg-white rounded-md">
        <div className=" flex items-end space-x-2">
          <p className="basis-full text-sm"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis veniam dolores similique, nam quisquam sunt. Nam vel tempore perferendis harum! </p>
          <p className="text-[10px]">8:30PM</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
