"use client";
import { useChat } from "@/context/chat.contex";
import { useUser } from "@/context/user.provider";
import { chatUser, ChatMessage } from "@/types";
import { FC, useEffect, useRef, useState } from "react";

const ChatBody: FC<{ selectUser: chatUser }> = ({ selectUser }) => {
  const { user } = useUser();
  const { socket, messages, setMessages } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load and manage messages
  useEffect(() => {
    // Load messages for the current chat
    socket?.on(
      "loadMessageSuccess",
      ({ messages }: { messages: ChatMessage[] }) => {
        setMessages(messages);
      }
    );

    // Receive a new message
    socket?.on("receiveMessage", (chatMessage: ChatMessage) => {
      setMessages((prevMsg) => [...prevMsg, chatMessage]);
    });

    // Handle typing indicator
    socket?.on("userTyping", ({ senderId }) => {
      if (senderId === selectUser._id) setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket?.off("loadMessageSuccess");
      socket?.off("receiveMessage");
      socket?.off("userTyping");
    };
  }, [socket, setMessages, selectUser]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark unread messages as read
  useEffect(() => {
    const unreadMessageIds = messages
      .filter(
        (msg) =>
          msg.receiverId === user?.id && // Message is for the current user
          msg.isRead === false // Message is unread
      )
      .map((msg) => msg._id);

    if (unreadMessageIds.length > 0) {
      socket?.emit("markAsRead", { messageIds: unreadMessageIds });
    }
  }, [messages, user?.id, socket]);

  // Listen for server confirmation of messages being marked as read
  useEffect(() => {
    socket?.on("messagesRead", ({ messageIds }: { messageIds: string[] }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          messageIds.includes(msg._id) ? { ...msg, isRead: true } : msg
        )
      );
    });

    return () => {
      socket?.off("messagesRead");
    };
  }, [socket, setMessages]);

  return (
    <div className="flex-1 overflow-y-scroll p-4">
      {messages &&
        messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === user?.id ? "justify-end" : "justify-start"
            } my-2`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.senderId === user?.id
                  ? "bg-gray-200 text-black"
                  : "bg-gray-300 text-black"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
              <span
                className={`ml-2 ${
                  msg.isRead ? "text-blue-500" : "text-gray-500"
                }`}
              >
                ✓✓
              </span>
            </div>
          </div>
        ))}
      {isTyping && <p className="text-gray-500 italic">User is typing...</p>}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBody;
