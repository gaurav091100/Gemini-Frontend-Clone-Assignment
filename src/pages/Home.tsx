import { useState } from 'react';
import Dashboard from '@/components/Dashboard/Dashboard';
import ChatInterface from '@/components/Chat/ChatInterface';
import type { ChatRoom } from '@/lib/types';

const Index = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);

  if (selectedChatRoom) {
    return (
        <ChatInterface 
          chatRoom={selectedChatRoom}
          onBack={() => setSelectedChatRoom(null)}
        />
    );
  }

  return (
      <Dashboard onSelectChatRoom={setSelectedChatRoom} />
  );
};

export default Index;