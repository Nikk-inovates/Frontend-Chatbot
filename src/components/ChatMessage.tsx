
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
    liked?: boolean;
    disliked?: boolean;
  };
  onFeedback: (messageId: string, type: 'like' | 'dislike') => void;
  onTextToSpeech: (text: string) => void;
}

export function ChatMessage({ message, onFeedback, onTextToSpeech }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Delay the appearance for a staggered effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);

  // Format the timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div
      ref={messageRef}
      className={cn(
        "w-full mb-4 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className={cn(
        "flex max-w-3xl",
        message.sender === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
      )}>
        <div className="flex flex-col">
          <div className={cn(
            "flex items-end gap-2",
            message.sender === 'user' ? "flex-row-reverse" : "flex-row"
          )}>
            <div className={cn(
              "px-4 py-3 rounded-2xl shadow-sm",
              message.sender === 'user' 
                ? "chat-bubble-user" 
                : "chat-bubble-bot"
            )}>
              <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
            </div>
            
            {message.sender === 'bot' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                onClick={() => onTextToSpeech(message.text)}
                aria-label="Read message aloud"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className={cn(
            "flex items-center mt-1 text-xs text-muted-foreground",
            message.sender === 'user' ? "justify-end" : "justify-start"
          )}>
            <span>{formattedTime}</span>
            
            {message.sender === 'bot' && (
              <div className="flex items-center ml-2 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-full hover:bg-secondary/80 feedback-button",
                    message.liked ? "text-green-500 bg-green-100 dark:bg-green-900/30" : "text-muted-foreground"
                  )}
                  onClick={() => onFeedback(message.id, 'like')}
                  aria-label="Like message"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 rounded-full hover:bg-secondary/80 feedback-button",
                    message.disliked ? "text-red-500 bg-red-100 dark:bg-red-900/30" : "text-muted-foreground"
                  )}
                  onClick={() => onFeedback(message.id, 'dislike')}
                  aria-label="Dislike message"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
