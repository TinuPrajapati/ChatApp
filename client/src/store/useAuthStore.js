import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {connect, io} from "socket.io-client";

const baseURL = import.meta.env.MODE === "development" ?`${import.meta.env.VITE_backend}/api`:"/api";

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    isCheckingAuth:true,
    socket:null,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log(`Error in checking auth: ${error}`);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data.newUser})
            toast.success(res.data.message)

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIng:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data.user})
            toast.success(res.data.message)

            get().connectSocket();
        } catch (error) {
            toast.error(error.message)
        }finally{
            set({isLoggingIng:false})
        }
    },

    logout:async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success(res.data.message)
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try{
            const res = await axiosInstance.put("/auth/update-profile",data,{
                headers:{
                    "Content-Type":"multipart/form-data",
                }
            });
            set({authUser:res.data.updateUserDetails})
            toast.success(res.data.message)
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connect()) return;
        const socket = io(baseURL,{
            query:{userId:authUser._id}
        });
        socket.connect();
        set({socket:socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connect) get().socket.disconnect();
    }
}))