import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-[70%] flex flex-col items-center justify-center h-full p-8 bg-base-100/50">
      {/* Icon with Animation */}
      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/10 animate-bounce">
        <MessageSquare className="w-8 h-8 text-primary" />
      </div>

      {/* Welcome Text */}
      <h2 className="mt-6 text-2xl font-bold text-center">Welcome to Chatty!</h2>
      <p className="mt-2 text-base-content/60 text-center">
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default NoChatSelected;
