"use client"
import { useChat } from "@/context/chat.contex";
import { FC, useEffect, useRef } from "react";

// const messages = [
//   { id: 1, text: "Hello!", sender: "other", time: "9:43 PM" },
//   {
//     id: 2,
//     text: "Invitation to join my WhatsApp group",
//     sender: "other",
//     time: "9:45 PM",
//   },
//   { id: 3, text: "Happy new Year", sender: "you", time: "7:40 PM" },
// ];

const ChatBody: FC = () => {

  const {socket, messages,setMessages}= useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    socket?.on("loadMessageSuccess", ({msg})=>{
      setMessages(msg)
    })
    socket?.on("receiveMessage", (msg)=>{
      setMessages((prevMsg)=>[...prevMsg, msg])
    })
    return ()=>{
      socket?.off('loadMessageSuccess');
      socket?.off('receiveMessage');
    }
  }, [socket, setMessages])

  // scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll p-4 bg-gray-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.senderId === socket?.id  ? "justify-end" : "justify-start"
          } my-2`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              msg.senderId === socket?.id 
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">{msg.time}</span>
          </div>
        </div>
      ))}
       <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBody;
