import { X, Bot } from "lucide-react";
import Chatbot from "./Chatbot";
import { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";

const ChatbotModal = ({ onClose }) => {
  const [scrolled, setScrolled] = useState(false);


const { clearChat } = useChatStore();

  // detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("chat-scroll");
      if (el) setScrolled(el.scrollTop > 10);
    };

    const el = document.getElementById("chat-scroll");
    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-end sm:items-center sm:justify-end">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chat Container */}
      <div className="relative w-full sm:w-[380px] h-[90vh] sm:h-[600px] m-4 
        bg-[#0f0f1a] border border-purple-500/20 
        rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER (Sticky + Shadow) */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between px-4 py-3 
          border-b border-gray-800 bg-[#0f0f1a] transition ${
            scrolled ? "shadow-md shadow-black/30" : ""
          }`}
        >
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-white">
                AI Travel Assistant
              </h2>

              {/* Online Status */}
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>

          {/* Close */}
          <X
            size={18}
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={onClose}
          />
        </div>

        {/* Chat Area */}
        <div id="chat-scroll" className="flex-1 overflow-y-auto">
          <button onClick={clearChat}>Clear</button>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;