import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[90%] w-full bg-base-200 flex items-center justify-center px-5 py-3 shadow-xl shadow-white">
      <div className="w-full h-full bg-base-100 rounded-lg shadow overflow-hidden flex border-2 border-white/20">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
