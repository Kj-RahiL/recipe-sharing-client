
"use client"
import { chatUser } from '@/types';
import { Avatar } from '@nextui-org/react';
import { MoreHorizontal, Phone, Video } from 'lucide-react';

const ChatHeader = async({selectUser}: {selectUser: chatUser}) => {
  
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <Avatar src={selectUser?.image} size="lg" />
        <div className="ml-4">
          <h3 className="font-bold text-lg">{selectUser?.name}</h3>
          <p className="text-sm text-gray-600">Online</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Phone className="text-gray-600 text-xl cursor-pointer" />
        <Video className="text-gray-600 text-xl cursor-pointer" />
        <MoreHorizontal className="text-gray-600 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;
