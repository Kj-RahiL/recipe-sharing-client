/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type ChatContextType = {
  socket: Socket | null;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  currentRoom: string | null;
  setCurrentRoom: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChatContext = createContext<ChatContextType>({
  socket: null,
  messages: [],
  setMessages: () => {},
  currentRoom: null,
  setCurrentRoom: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('https://recipe-sharing-server-olive.vercel.app'); // Replace with your backend URL

    socket.current.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.current?.id);
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        socket: socket.current,
        messages,
        setMessages,
        currentRoom,
        setCurrentRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
