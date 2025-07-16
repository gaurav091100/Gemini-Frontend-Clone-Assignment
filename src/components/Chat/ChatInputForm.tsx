import { Button } from "../ui/button";
import { ImageIcon, Send } from "lucide-react";
import { Input } from "../ui/input";
import type { ChatRoom, Message } from "@/lib/types";
import { addMessage } from "@/store/slices/chatSlice";
import { toast } from "sonner";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface ChatInputFormProps {
  chatRoom: ChatRoom;
  simulateAIResponse: (userMessage: string) => Promise<void>;
  setShowImageUpload: (value: boolean) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  chatRoom,
  simulateAIResponse,
  setShowImageUpload,
}) => {
  const [messageText, setMessageText] = useState("");
  const dispatch = useAppDispatch();

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
      chatRoomId: chatRoom.id,
    };

    dispatch(addMessage(userMessage));
    const currentMessage = messageText;
    setMessageText("");

    toast.success("Your message has been delivered to Gemini.");

    // Simulate AI response
    await simulateAIResponse(currentMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <form
      className="p-4 border-t bg-card flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      aria-label="Send message form"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowImageUpload(true)}
        aria-label="Upload image"
      >
        <ImageIcon className="h-5 w-5" />
      </Button>
      <Input
        type="text"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1"
        aria-label="Message input"
        autoFocus
      />
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600"
        aria-label="Send message"
        disabled={!messageText.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInputForm;
