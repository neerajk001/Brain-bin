import React from "react";
import { Brain, Youtube, Instagram, Twitter, File, LogOut, Image, LayoutGrid } from "lucide-react";
import { authStore } from "../store/authStore";

const Sidebar = ({ setFilter, activeFilter }) => {
  const { logout } = authStore();

  const sidebarItems = [
    { 
      name: "All Content", 
      type: "all", 
      icon: <LayoutGrid size={20} className="text-white" />, 
      bg: "bg-gray-600" 
    },
    { 
      name: "YouTube", 
      type: "youtube", 
      icon: <Youtube size={20} className="text-white" />, 
      bg: "bg-red-600" 
    },
    { 
      name: "Instagram", 
      type: "instagram", 
      icon: <Instagram size={20} className="text-white" />, 
      bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" 
    },
    { 
      name: "Twitter", 
      type: "twitter", 
      icon: <Twitter size={20} className="text-white" />, 
      bg: "bg-blue-500" 
    },
    { 
      name: "Images", 
      type: "images", 
      icon: <Image size={20} className="text-white" />, 
      bg: "bg-indigo-600" 
    },
    { 
      name: "Documents", 
      type: "documents", 
      icon: <File size={20} className="text-white" />, 
      bg: "bg-amber-500" 
    },
  ];

  // Helper to check if item is active
  const isActive = (type) => {
    if (!activeFilter || activeFilter === "") return type === "all";
    return activeFilter === type;
  };

  return (
    <div className="h-full w-full flex flex-col text-white">
      
      {/* Branding / Logo */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1DB954]/20 rounded-lg border border-[#1DB954]/30">
             <Brain size={24} className="text-[#1DB954]" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Brain<span className="text-black bg-[#1DB954] px-1 ml-0.5 rounded text-sm align-middle">Bin</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 mt-4">
          Filters
        </div>
        
        {sidebarItems.map(({ name, type, icon, bg }) => (
          <button
            key={name}
            onClick={() => setFilter(type)}
            className={`
              w-full flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 group
              ${isActive(type) 
                ? "bg-zinc-800 text-white border border-zinc-700" 
                : "text-gray-400 hover:bg-zinc-900 hover:text-white border border-transparent"}
            `}
          >
            <div className={`
              p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 shadow-sm
              ${isActive(type) ? bg : "bg-zinc-800 grayscale group-hover:grayscale-0"}
            `}>
              {icon}
            </div>
            <span className="font-medium text-sm">{name}</span>
            
            {/* Active Indicator Dot */}
            {isActive(type) && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1DB954] shadow-[0_0_8px_rgba(29,185,84,0.8)]" />
            )}
          </button>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-zinc-800 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full 
                     bg-zinc-900 text-gray-300 border border-zinc-800 
                     hover:bg-red-600 hover:text-white hover:border-red-600
                     transition-all duration-300 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;