import type { ChatRoom } from "@/lib/types";

export const demoChatRooms: ChatRoom[] = [
  {
    id: "demo-1",
    title: "Creative Writing Assistant",
    lastMessage:
      "That's a fantastic story idea! Let me help you develop it further.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: "demo-2",
    title: "Code Review & Help",
    lastMessage:
      "Your React component looks good! Here are some optimization suggestions.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "demo-3",
    title: "Daily Planning",
    lastMessage: "Here's a structured plan for your productive day ahead!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
];
