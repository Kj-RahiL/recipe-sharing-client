"use client";
import { useState } from "react";
import { chatUser } from "@/types";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = () => {
  const [selectUser, setSelectUser] = useState<chatUser | null>(null);

  const handleSelectUser = (user: chatUser) => {
    setSelectUser(user);
  };
  // console.log(selectUser, 'see')
  return (
    <div className="flex h-screen">
      <Sidebar onSelectUser={handleSelectUser} />
      {selectUser && (
        <div className="flex-1 flex flex-col">
          <ChatHeader selectUser={selectUser} />
          <ChatBody selectUser={selectUser} />
          <ChatFooter  selectUser={selectUser}/>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
