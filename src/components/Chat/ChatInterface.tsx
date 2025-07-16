import React, { useState, useRef, useEffect } from "react";
import type { ChatRoom, Message } from "@/lib/types";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  addMessage,
  setTyping,
  selectChatRoomMessages,
} from "@/store/slices/chatSlice";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { formatDate } from "@/utils/formateDate";
import ChatInputForm from "./ChatInputForm";

interface ChatInterfaceProps {
  chatRoom: ChatRoom;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatRoom, onBack }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [page, setPage] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isTyping } = useAppSelector((state) => state.chat);
  const messages = useAppSelector(selectChatRoomMessages(chatRoom.id));

  const displayedMessages = messages.slice(0, page * 20);

  // Auto-scroll to bottom for new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Simulate AI response with throttling
  const simulateAIResponse = async (
    _userMessage: string,
    userImage?: string
  ) => {
    dispatch(setTyping(true));

    // Simulate AI thinking time (1-3 seconds)
    const thinkingTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
      const aiResponses = [
        "That's an interesting perspective! Let me help you explore this further.",
        "I understand what you're asking. Here's my take on this topic.",
        "Great question! This touches on several important concepts.",
        "I appreciate you sharing that with me. Let me provide some insights.",
        "This is a fascinating subject. There are multiple angles to consider here.",
        "Thank you for the details. I can help you think through this systematically.",
        "That's a complex topic that deserves a thoughtful response.",
        "I see what you're getting at. Let me break this down for you.",
      ];

      let responseText =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      if (userImage) {
        responseText =
          "I can see the image you've shared. " +
          responseText +
          " Based on what I observe in the image, there are several interesting elements to discuss.";
      }

      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: responseText,
        isUser: false,
        timestamp: new Date(),
        chatRoomId: chatRoom.id,
      };

      dispatch(addMessage(aiMessage));
      dispatch(setTyping(false));
    }, thinkingTime);
  };

  

  const handleImageUpload = async (imageData: string) => {
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: "Shared an image",
      isUser: true,
      timestamp: new Date(),
      chatRoomId: chatRoom.id,
      image: imageData,
    };

    dispatch(addMessage(userMessage));
    setShowImageUpload(false);

    toast.success("Your image has been shared with Gemini.");

    // Simulate AI response to image
    await simulateAIResponse("Shared an image", imageData);
  };

 

  const loadMoreMessages = () => {
    if (displayedMessages.length < messages.length) {
      setPage((prev) => prev + 1);
    }
  };

  // Infinite scroll handler
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (
      container &&
      container.scrollTop === 0 &&
      displayedMessages.length < messages.length
    ) {
      loadMoreMessages();
    }
  };

  const shouldShowDateSeparator = (currentMsg: Message, prevMsg?: Message) => {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.timestamp).toDateString();
    const prevDate = new Date(prevMsg.timestamp).toDateString();

    return currentDate !== prevDate;
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-md p-4 z-50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">{chatRoom.title}</h1>
            <p className="text-sm text-muted-foreground">
              Chat with Gemini AI
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-auto p-4 space-y-4"
        onScroll={handleScroll}
        aria-label="Chat messages"
        tabIndex={0}
      >
        {displayedMessages.length < messages.length && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadMoreMessages}
              className="text-muted-foreground"
              aria-label="Load older messages"
            >
              Load older messages
            </Button>
            {/* Skeleton for loading older messages */}
            <div
              className="flex flex-col items-center gap-2 mt-2"
              aria-hidden="true"
            >
              <div className="w-32 h-4 bg-muted animate-pulse rounded" />
              <div className="w-24 h-4 bg-muted animate-pulse rounded" />
            </div>
          </div>
        )}

        {displayedMessages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Start your conversation
            </h3>
            <p className="text-muted-foreground">
              Send a message to begin chatting with Gemini AI
            </p>
          </div>
        ) : (
          displayedMessages.map((message, index) => {
            const prevMessage =
              index > 0 ? displayedMessages[index - 1] : undefined;
            const showDateSeparator = shouldShowDateSeparator(
              message,
              prevMessage
            );

            return (
              <div
                key={message.id}
                tabIndex={0}
                aria-label={message.isUser ? "Your message" : "Gemini message"}
              >
                {showDateSeparator && (
                  <div className="flex items-center gap-4 my-6">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground bg-background px-2">
                      {formatDate(message.timestamp)}
                    </span>
                    <Separator className="flex-1" />
                  </div>
                )}
                <MessageBubble message={message} />
              </div>
            );
          })
        )}

        {/* Skeleton for AI typing */}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input and actions */}
      <ChatInputForm chatRoom={chatRoom} simulateAIResponse={simulateAIResponse} setShowImageUpload={setShowImageUpload} />

      <ImageUpload
        open={showImageUpload}
        onOpenChange={setShowImageUpload}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default ChatInterface;
