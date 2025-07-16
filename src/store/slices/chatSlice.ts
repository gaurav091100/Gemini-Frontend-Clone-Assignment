import {
  createSlice,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { ChatRoom, Message } from "@/lib/types";
import { type RootState } from "../store";
import { demoChatRooms } from "@/constants/demoChatRooms";
import { demoMessages } from "@/constants/demoChatMessages";

interface ChatState {
  chatRooms: ChatRoom[];
  messages: Message[];
  currentChatRoom: string | null;
  isTyping: boolean;
  searchQuery: string;
}

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("chat-storage");
    if (stored) {
      const parsed = JSON.parse(stored, (_key, value) => {
        if (value && typeof value === "object" && value.__type === "Date") {
          return new Date(value.value);
        }
        return value;
      });
      return parsed.state || { chatRooms: [], messages: [] };
    }
  } catch (error) {
    console.error("Error loading chat data from storage:", error);
  }
  return { chatRooms: [], messages: [] };
};

const saveToStorage = (state: ChatState) => {
  try {
    const serialized = JSON.stringify(
      {
        state: {
          chatRooms: state.chatRooms,
          messages: state.messages,
        },
      },
      (_key, value) => {
        if (value instanceof Date) {
          return { __type: "Date", value: value.toISOString() };
        }
        return value;
      }
    );
    localStorage.setItem("chat-storage", serialized);
  } catch (error) {
    console.error("Error saving chat data to storage:", error);
  }
};

const storedData = loadFromStorage();

const initialState: ChatState = {
  chatRooms: storedData.chatRooms?.length ? storedData.chatRooms : [...demoChatRooms],
  messages: storedData.messages?.length ? storedData.messages : [...demoMessages],
  currentChatRoom: null,
  isTyping: false,
  searchQuery: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.chatRooms = [action.payload, ...state.chatRooms];
      saveToStorage(state);
    },
    deleteChatRoom: (state, action: PayloadAction<string>) => {
      state.chatRooms = state.chatRooms.filter(
        (room) => room.id !== action.payload
      );
      state.messages = state.messages.filter(
        (msg) => msg.chatRoomId !== action.payload
      );
      if (state.currentChatRoom === action.payload) {
        state.currentChatRoom = null;
      }
      saveToStorage(state);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
      state.chatRooms = state.chatRooms.map((room) =>
        room.id === action.payload.chatRoomId
          ? {
              ...room,
              lastMessage: action.payload.content,
              lastMessageTime: action.payload.timestamp,
            }
          : room
      );
      saveToStorage(state);
    },
    setCurrentChatRoom: (state, action: PayloadAction<string | null>) => {
      state.currentChatRoom = action.payload;
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

// Selectors
export const selectFilteredChatRooms = createSelector(
  [
    (state: RootState) => state.chat.chatRooms,
    (state: RootState) => state.chat.searchQuery,
  ],
  (chatRooms, searchQuery) => {
    if (!searchQuery) return chatRooms;
    return chatRooms.filter((room) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);

export const selectChatRoomMessages = (chatRoomId: string) =>
  createSelector(
    [(state: RootState) => state.chat.messages],
    (messages) =>
      messages
        .filter((msg) => msg.chatRoomId === chatRoomId)
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
    // .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  );

export const {
  addChatRoom,
  deleteChatRoom,
  addMessage,
  setCurrentChatRoom,
  setTyping,
  setSearchQuery,
} = chatSlice.actions;
export default chatSlice.reducer;
