"use client"

import { FC } from 'react';
import { Avatar } from '@nextui-org/react';
import { useChat } from '@/context/chat.contex';

const conversations = [
  { id: 1, name: 'Nahid Vai', lastMessage: '💚', time: '1/9/2025', img: '/user1.jpg' },
  { id: 2, name: 'Instagram', lastMessage: 'You received a one-time password', time: '1/7/2025', img: '/user2.jpg' },
  { id: 3, name: '+880 1815-607429', lastMessage: 'Happy new Year', time: '1/1/2025', img: '/user3.jpg' },
  // Add more dummy conversations
];

const Sidebar: FC = () => {
  const { socket, setCurrentRoom } = useChat();

  const joinRoom = (otherUserId: string) => {
    const userId = socket?.id;
    const roomId = [userId, otherUserId].sort().join('-');
    setCurrentRoom(roomId);

    socket?.emit('joinChat', { userId, otherUserId });
    socket?.emit('loadMessage', { senderId: userId, receiverId: otherUserId });
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
        {conversations.map((conv) => (
          <div key={conv.id} className="flex items-center p-4 hover:bg-gray-200 cursor-pointer">
            <Avatar src={conv.img} size="lg" className="mr-4" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{conv.name}</h3>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            </div>
            <p className="text-xs text-gray-500">{conv.time}</p>
          </div>
        ))}
      </div>
      <button onClick={() => joinRoom('otherUserId')} className="block p-2 rounded bg-gray-200">
        Chat with User
      </button>
    </div>
  );
};

export default Sidebar;
