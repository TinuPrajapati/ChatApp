import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [formData, setFormData] = useState({
    text: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const {id} = e.target;
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: file }))
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleChange=(e)=>{
    const {id,value} = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() && !imagePreview) return;

    try {
      await sendMessage(formData);
      setFormData({
        text: "",
        image: "",
      });
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center
                rounded-full bg-base-300 text-zinc-700 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          id="text"
          type="text"
          className="flex-1 input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={formData.text}
          onChange={handleChange}
        />
        <input
          id="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <button
          type="button"
          className="btn btn-circle btn-sm sm:btn-md text-zinc-400 hover:text-primary"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach Image"
        >
          <Image size={20} />
        </button>
        <button
          type="submit"
          className="btn btn-circle btn-sm sm:btn-md text-primary"
          disabled={!formData.text.trim() && !imagePreview}
          aria-label="Send Message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
