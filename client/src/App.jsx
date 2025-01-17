import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast";

export default function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme}=useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth&& !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div data-theme={theme} className="w-[100vw] h-[100vh]">
      <Navbar/>
      <Outlet/>
      <Toaster/>
    </div>
  )
}