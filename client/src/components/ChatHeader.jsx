import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import avatar from "../assets/avatar.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="py-2 px-4 border-b border-base-300 flex items-center justify-between">
      {/* User Info Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="avatar size-10">
          <img
            src={selectedUser?.profile || avatar}
            alt={selectedUser?.name || "User Avatar"}
            className="rounded-full"
          />
        </div>

        {/* User Details */}
        <div>
          <h3 className="font-medium">{selectedUser?.name || "Unknown User"}</h3>
          <p className="text-sm text-base-content/70">
            {selectedUser && onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Chat Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-sm"
        aria-label="Close Chat"
      >
        <X className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ChatHeader;