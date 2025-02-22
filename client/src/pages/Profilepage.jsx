import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import avatar from "../assets/avatar.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(authUser.profile || avatar);
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    image: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }

  const handleImageUpload = async (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [id]: file }));
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
    reader.readAsDataURL(file);
  };
  // () => (isEditable ? handleUpdate() : setIsEditable(true))

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isEditable) {
      await updateProfile(formData);
      setIsEditable(false);
    }else{
      setIsEditable(true);
    }
  };

  return (
    <div className="h-[90%] py-5 flex justify-center items-center">
      <div className="bg-base-300 rounded-xl p-6 space-y-2 w-[70%] flex gap-4 h-[100%]">
        {/* Left Section */}
        <div className="w-[60%] h-full flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center">Your Profile</h1>

          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={selectedImg}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              {isEditable && (
                <label
                  htmlFor="image"
                  className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            {isUpdatingProfile && <p className="text-sm text-zinc-400">Uploading...</p>}
          </div>

          {/* Profile Form */}
          <form className="flex flex-col items-center gap-2">
            <div className="space-y-1.5 w-full">
              <label className="text-sm text-zinc-400 flex items-center gap-2" htmlFor="name">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>

            <div className="space-y-1.5 w-full">
              <label className="text-sm text-zinc-400 flex items-center gap-2" htmlFor="email">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <button
              className="btn btn-primary px-6 text-xl text-white"
              onClick={handleUpdate}
            >
              {isEditable ? "Update" : "Change"}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-base-300 px-6 w-[40%] h-full">
          <h2 className="text-lg font-medium mb-2">Account Information</h2>
          <div className="text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
