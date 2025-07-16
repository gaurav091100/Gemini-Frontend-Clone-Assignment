import React from 'react';
import { Sparkles } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
        <Sparkles className="h-4 w-4 text-white" />
      </div>

      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="bg-muted border rounded-2xl px-4 py-3">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">Gemini is typing...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;