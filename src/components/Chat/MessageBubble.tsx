import React, { useState } from 'react';
import type { Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Copy, Check, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { formatTime } from '@/utils/formatTime';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Message content has been copied.');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err)
      toast.error('Could not copy message to clipboard.');
    }
  };



  return (
    <div
      className={cn(
        'flex gap-3 group',
        message.isUser ? 'justify-end' : 'justify-start'
      )}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
      tabIndex={0} // Make bubble focusable
      aria-label={message.isUser ? 'Your message' : 'Gemini message'}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && showCopy) {
          handleCopy();
        }
      }}
    >
      {!message.isUser && (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] sm:max-w-[70%] relative',
          message.isUser ? 'order-first' : ''
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3 relative',
            message.isUser
              ? 'bg-blue-500 text-white ml-auto'
              : 'bg-muted border'
          )}
        >
          {message.image && (
            <div className="mb-3">
              <img
                src={message.image}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto max-h-64 object-cover"
              />
            </div>
          )}
          
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Copy button */}
          {showCopy && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              aria-label="Copy message to clipboard"
              className={cn(
                'absolute -top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity',
                message.isUser
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : 'bg-background border shadow-sm'
              )}
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>

        <div
          className={cn(
            'text-xs text-muted-foreground mt-1 px-1',
            message.isUser ? 'text-right' : 'text-left'
          )}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>

      {message.isUser && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shrink-0 mt-1">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;