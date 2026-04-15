import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set) => ({
      messages: [
        { role: "bot", text: "Hi 👋 Where do you want to travel?" },
      ],

      addMessage: (msg) =>
        set((state) => ({
          messages: [...state.messages, msg],
        })),

      clearChat: () =>
        set({
          messages: [
            { role: "bot", text: "Hi 👋 Where do you want to travel?" },
          ],
        }),
    }),
    {
      name: "travel-chat-storage", // localStorage key
    }
  )
);

export default useChatStore;