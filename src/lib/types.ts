export interface User {
  id: string;
  phone: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface ChatRoom {
  id: string;
  title: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  image?: string;
  chatRoomId: string;
}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
}