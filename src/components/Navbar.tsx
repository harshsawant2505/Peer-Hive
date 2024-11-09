import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full  bg-[#020817] p-3 px-7 flex items-center justify-between gap-3">
      {/* Logo */}
     
      
      {/* Search Input */}
      
      
      {/* Navigation Links */}
      <div className="flex items-center  gap-8 ml-3">

      <div className="text-white font-bold cursor-pointer">
        <img src="/assets/logo.png" className='w-12' alt="" />
      </div>

      <div className="relative flex-1 max-w-xs">
        <Input 
          type="text"
          placeholder="Search"
          className="w-full bg-[#1e293b]/50 border text-white placeholder:text-slate-400 rounded-md"
        />
      </div>

        <button className="px-4 py-1 rounded-md bg-[#e4d3ff]/20 text-[#e4d3ff] hover:bg-[#e4d3ff]/30">
          Clubs
        </button>
        <button className="px-4 py-1 rounded-md bg-[#e4d3ff]/20 text-[#e4d3ff] hover:bg-[#e4d3ff]/30">
          Councils
        </button>
        <button className="px-4 py-1 rounded-md bg-[#e4d3ff]/20 text-[#e4d3ff] hover:bg-[#e4d3ff]/30">
          Events
        </button>
        <button className="px-4 py-1 rounded-md bg-[#e4d3ff]/20 text-[#e4d3ff] hover:bg-[#e4d3ff]/30">
          Create +
        </button>
        <button className="px-4 py-1 rounded-md bg-[#60a5fa] text-white hover:bg-[#60a5fa]/90">
          Join
        </button>
      </div>
      
      {/* Profile Icon */}
      <div className="w-8 h-8 rounded-full bg-slate-200" />
    </nav>
  );
};

export default Navbar;