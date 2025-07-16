import { Button } from "../ui/button";
import { MessageSquare, Plus } from "lucide-react";

interface NoChatRoomFoundProps {
  searchQuery: string;
  setShowCreateDialog: (show: boolean) => void;
}

const NoChatRoomFound: React.FC<NoChatRoomFoundProps> = ({
  searchQuery,
  setShowCreateDialog,
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {searchQuery ? "No chatrooms found" : "No chatrooms yet"}
      </h3>
      <p className="text-muted-foreground mb-4">
        {searchQuery
          ? "Try adjusting your search terms"
          : "Create your first chatroom to start conversing with Gemini AI"}
      </p>
      {!searchQuery && (
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-blue-500 hover:bg-blue-600"
          aria-label="Create first chatroom"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Chatroom
        </Button>
      )}
    </div>
  );
};

export default NoChatRoomFound;
