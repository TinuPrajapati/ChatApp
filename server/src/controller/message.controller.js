import User from "../model/user.model.js";
import Message from "../model/message.model.js";
import { cloudinary } from "../lib/cloudinary.js";
import { getReciverSocketId, io } from "../lib/socket.js";

export const getUsersForSiderbar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log(`Error fetching users for sidebar: ${error}`);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    var path = "";
    if (req.file) path = req?.file?.path;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text.trim(),
      image: path,
    });

    await newMessage.save();

    // implement real time functionality using socket.io
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error sending message: ${error}`);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};
