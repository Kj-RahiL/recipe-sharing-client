"use client";

import { Avatar } from "@nextui-org/react";
import { useChat } from "@/context/chat.contex";
import { useUser } from "@/context/user.provider";
import { useGetSingleUser } from "@/hooks/user.hook";
import { chatUser } from "@/types";



const Sidebar =({ onSelectUser }: { onSelectUser: (user: chatUser) => void }) => {
  const { user } = useUser();
  const currentUser = useGetSingleUser(user?.id!)
  const followingUser = currentUser?.data?.data?.following


  const { socket, setCurrentRoom } = useChat();

  const joinRoom = (selectUser: chatUser) => {
    const userId = user?.id;
    const otherUserId = selectUser?._id;

    const roomId = [userId, otherUserId].sort().join("-");
    setCurrentRoom(roomId);

    socket?.emit("joinChat", { userId, otherUserId });
    socket?.emit("loadMessage", { senderId: userId, receiverId: otherUserId });

    onSelectUser(selectUser)
  };

  return (
    <div className="w-1/3 border-r h-screen overflow-y-scroll bg-gray-100">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        {followingUser && followingUser.map((user:chatUser) => (
          <div
            key={user._id}
            onClick={() => joinRoom(user)}
            className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
          >
            <Avatar src={user.image} size="lg" className="mr-4" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{user.name}</h3>
              {/* <p className="text-sm text-gray-600 truncate">
                {conv.lastMessage}
              </p> */}
            </div>
            {/* <p className="text-xs text-gray-500">{conv.time}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
