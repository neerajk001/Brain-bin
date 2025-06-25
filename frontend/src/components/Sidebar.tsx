import  { useState } from "react";
import { Brain, Youtube, Instagram, Twitter, File, LogOut, Image } from "lucide-react";
import { authStore } from "../store/authStore";


interface SidebarProps {
  setFilter: (type: string) => void;
}

const Sidebar = ({ setFilter }: SidebarProps) => {
  const [activeFilter, setActiveFilter] = useState("");

  const {logout} =authStore()

  const sidebarItems = [
    { name: "All", type: "" },
    { name: "YouTube", type: "youtube", icon: <Youtube className="text-white" />, bg: "bg-red-600" },
    { name: "Instagram", type: "instagram", icon: <Instagram className="text-white" />, bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" },
    { name: "Twitter", type: "twitter", icon: <Twitter className="text-white" />, bg: "bg-blue-500" },
    { name: "Images", type: "images", icon: <Image className="text-white" />, bg: "bg-blue-800" },
    { name: "Document", type: "documents", icon: <File className="text-white" />, bg: "bg-yellow-500" },
  ];

  return (
    <div className="h-screen w-20 md:w-72 fixed left-0 top-0 bg-white/10 backdrop-blur-md text-white border-r border-white/20 shadow-xl rounded-r-xl transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start mt-8 ml-0 md:ml-6 gap-2">
        <Brain size={28} />
        <span className="hidden md:inline font-bold text-xl">
          brain <span className="text-black bg-amber-400 px-1 rounded">bin</span>
        </span>
      </div>

      {/* Menu */}
      <div className="mt-10 w-full px-1 md:px-4 py-3 space-y-2">
        {sidebarItems.map(({ name, type, icon, bg }) => (
          <div
            key={name}
            className={`flex items-center gap-3 py-2 px-2 md:px-4 rounded-lg cursor-pointer transition duration-200 hover:scale-105
              ${activeFilter === type ? `${bg} text-white scale-105` : "hover:bg-gray-700/50"}
            `}
            onClick={() => {
              setActiveFilter(type);
              setFilter(type);
            }}
          >
            <div className={`p-2 rounded ${bg}`}>{icon}</div>
            <span className="hidden md:inline">{name}</span>
          </div>
        ))}

        {/* Logout */}
        <div className="flex justify-center items-center w-full text-center mt-4">
          <button
            onClick={logout}
            className="bg-red-600 w-full md:w-11/12 p-2 rounded-lg font-semibold text-sm md:text-base hover:scale-105 flex items-center justify-center gap-2 transition"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
