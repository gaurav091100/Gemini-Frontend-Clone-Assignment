import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/hooks/useChatStore";
import type { ChatRoom } from "@/lib/types";
import { toast } from "sonner";

const createChatRoomSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

type CreateChatRoomData = z.infer<typeof createChatRoomSchema>;

interface CreateChatRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateChatRoomDialog: React.FC<CreateChatRoomDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { addChatRoom } = useChatStore();

  const form = useForm<CreateChatRoomData>({
    resolver: zodResolver(createChatRoomSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: CreateChatRoomData) => {
    const newChatRoom: ChatRoom = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      createdAt: new Date(),
    };

    addChatRoom(newChatRoom);

    toast.success(
      `"${data.title}" is ready for your conversations with Gemini.`
    );

    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Create New Chatroom
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Chatroom Title<span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter chatroom title"
              {...form.register("title")}
              className="bg-background"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description for chatroom"
              rows={3}
              {...form.register("description")}
              className="bg-background resize-none"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
              disabled={!form.formState.isValid}
            >
              Create Chatroom
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatRoomDialog;
