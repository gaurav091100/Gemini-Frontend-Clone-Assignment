import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatRelativeDate } from "@/utils/formateRelativeDate";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteChatRoom } from "@/store/slices/chatSlice";
import type { ChatRoom } from "@/lib/types";


interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  onSelectChatRoom: (chatRoom: ChatRoom) => void;
}

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ chatRoom, onSelectChatRoom }) => {
  const dispatch = useAppDispatch();

  const handleDeleteChatRoom = (id: string, title: string) => {
    dispatch(deleteChatRoom(id));
    toast.success(`"${title}" has been permanently deleted.`);
  };
  return (
    <Card
      key={chatRoom.id}
      className="cursor-pointer hover:shadow-md transition-all duration-200 group"
      tabIndex={0} // Make card focusable for keyboard navigation
      role="button"
      aria-label={`Open chatroom ${chatRoom.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelectChatRoom(chatRoom);
      }}
      onClick={() => onSelectChatRoom(chatRoom)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 mr-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{chatRoom.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {formatRelativeDate(chatRoom?.createdAt)}
              </Badge>
            </div>
            {chatRoom.lastMessage && (
              <p className="text-sm text-muted-foreground truncate">
                {chatRoom.lastMessage}
              </p>
            )}
            {chatRoom.lastMessageTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Last activity: {formatRelativeDate(chatRoom?.lastMessageTime)}
              </p>
            )}
          </div>
          {/* Delete chatroom dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Delete chatroom ${chatRoom.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Chatroom</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{chatRoom.title}"? This
                  action cannot be undone and all messages will be permanently
                  lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    handleDeleteChatRoom(chatRoom.id, chatRoom.title)
                  }
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatRoomCard;
