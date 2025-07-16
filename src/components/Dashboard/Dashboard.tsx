
import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSearchQuery, selectFilteredChatRooms } from '@/store/slices/chatSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  MessageSquare, 
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import CreateChatRoomDialog from './CreateChatRoomDialog';
import type { ChatRoom } from '@/lib/types';
import NoChatRoomFound from './NoChatRoomFound';
import ChatRoomCard from './ChatRoomCard';

interface DashboardProps {
  onSelectChatRoom: (chatRoom: ChatRoom) => void;
}

const Home: React.FC<DashboardProps> = ({ onSelectChatRoom }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { chatRooms, searchQuery } = useAppSelector((state) => state.chat);
  const filteredChatRooms = useAppSelector(selectFilteredChatRooms);

  // Debounced search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(localSearchQuery));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, dispatch]);

  
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Search and Create */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chatrooms..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search chatrooms"
            />
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-500 hover:bg-blue-600"
            aria-label="Create new chatroom"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        {/* Stats */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{chatRooms.length} chatrooms</span>
          </div>
          {searchQuery && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <span>{filteredChatRooms.length} results found</span>
            </>
          )}
        </div>
      </div>

      {/* Chatrooms List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        {filteredChatRooms.length === 0 ? (
          <NoChatRoomFound searchQuery={searchQuery} setShowCreateDialog={setShowCreateDialog} />
        ) : (
          <div className="space-y-3">
            {/* List of chatrooms */}
            {filteredChatRooms.map((chatRoom) => (
              <ChatRoomCard chatRoom={chatRoom} onSelectChatRoom={onSelectChatRoom}  />
            ))}
          </div>
        )}
      </div>

      {/* Create chatroom dialog */}
      <CreateChatRoomDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};

export default Home;
