
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { 
  addChatRoom, 
  deleteChatRoom, 
  addMessage, 
  setCurrentChatRoom, 
  setTyping, 
  setSearchQuery,
  selectFilteredChatRooms,
  selectChatRoomMessages
} from '@/store/slices/chatSlice';
import type { ChatRoom, Message } from '@/lib/types';

export const useChatStore = () => {
  const dispatch = useAppDispatch();
  const { chatRooms, messages, currentChatRoom, isTyping, searchQuery } = useAppSelector((state) => state.chat);

  return {
    chatRooms,
    messages,
    currentChatRoom,
    isTyping,
    searchQuery,
    addChatRoom: (chatRoom: ChatRoom) => dispatch(addChatRoom(chatRoom)),
    deleteChatRoom: (id: string) => dispatch(deleteChatRoom(id)),
    addMessage: (message: Message) => dispatch(addMessage(message)),
    setCurrentChatRoom: (id: string | null) => dispatch(setCurrentChatRoom(id)),
    setTyping: (typing: boolean) => dispatch(setTyping(typing)),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    getFilteredChatRooms: () => selectFilteredChatRooms,
    getChatRoomMessages: (chatRoomId: string) => selectChatRoomMessages(chatRoomId),
  };
};
