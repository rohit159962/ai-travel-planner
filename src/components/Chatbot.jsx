import { useEffect, useRef, useState } from "react";
import { Bot, User, Send } from "lucide-react";
import useChatStore from "../store/useChatstore";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
const { messages, addMessage } = useChatStore();
  const suggestions = [
    "Goa trip under 20k",
    "Manali 3-day itinerary",
    "Weekend trip from Delhi",
    "Budget trip to Jaipur",
  ];

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const sendMessage = async (customInput) => {
  const messageToSend = customInput || input;

  if (!messageToSend.trim()) return;

  addMessage({ role: "user", text: messageToSend });
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageToSend }),
    });

    const data = await res.json();

    addMessage({
      role: "bot",
      text: `Trip to ${data.destination} for ${data.days} days ✨`,
    });
  } catch {
    addMessage({
      role: "bot",
      text: "Something went wrong 😢",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col h-full bg-[#0f0f1a] text-white">
      
      {/* Messages + Suggestions */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 bg-[#0f0f1a]">

        {/* Welcome + Suggestions */}
        {messages.length === 1 && !loading && (
          <>
            <div className="text-center text-gray-400 text-sm">
              ✨ Try asking:
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((text, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(text)}
                  className="text-xs px-3 py-1.5 rounded-full 
                  bg-[#1a1a2e] text-gray-300 border border-purple-500/20 
                  hover:bg-[#2a2a40] hover:text-white transition hover:scale-105"
                >
                  {text}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Avatar */}
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
            )}

            {/* Message */}
            <div
              className={`max-w-[75%] text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#2a2a40] px-4 py-2 rounded-2xl text-white"
                  : "text-gray-300"
              }`}
            >
              {msg.text}
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>

            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-3 bg-[#0f0f1a]">
        <div className="flex items-center bg-[#1a1a2e] rounded-full px-3 py-2">
          <input
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your trip..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={() => sendMessage()}
            className="ml-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;