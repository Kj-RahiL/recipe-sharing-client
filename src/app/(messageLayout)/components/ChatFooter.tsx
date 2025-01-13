"use client"

import {  useState } from 'react';
import { Input } from '@nextui-org/react';
import { Send, Smile } from 'lucide-react';
import { useChat } from '@/context/chat.contex';

const ChatFooter= () => {
  const { socket, currentRoom } = useChat();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || !currentRoom) return;
    console.log('Message sent:', message);
    socket?.emit('sendMessage', {
      senderId: socket.id,
      receiverId: currentRoom, 
      message,
    });

    setMessage('')
  };
  

  return (
    <div className="p-4 border-t bg-white flex items-center space-x-2">
      <Smile className="text-gray-600 text-2xl cursor-pointer" />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
         onKeyDown={() => socket?.emit('typing', { senderId: socket?.id, receiverId: currentRoom })}
        placeholder="Type a message..."
        className="border-none"
      />
      <Send
        onClick={handleSend}
        className="text-green-500 text-2xl cursor-pointer"
      />
    </div>
  );
};

export default ChatFooter;
