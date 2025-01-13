import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import Sidebar from "../components/Sidebar";

const ChatPage= () => {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </div>
      </div>
    );
  };
  
  export default ChatPage;