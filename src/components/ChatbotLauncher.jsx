import { useState } from "react";
import { Bot } from "lucide-react";
import ChatbotModal from "./ChatbotModal";

const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
      >
        <Bot size={24} />
      </button>

      {/* Modal */}
      {open && <ChatbotModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatbotLauncher;