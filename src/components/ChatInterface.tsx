
import React, { KeyboardEvent } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessage } from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';

export function ChatInterface() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleFeedback,
    handleTextToSpeech,
    messagesEndRef
  } = useChatbot();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[calc(100vh-14rem)] max-w-4xl w-full mx-auto border rounded-xl shadow-sm overflow-hidden theme-transition animate-fade-in">
      <div className="p-4 border-b bg-secondary/50 theme-transition">
        <h2 className="text-lg font-semibold text-center">Bignalytics AI Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onFeedback={handleFeedback}
              onTextToSpeech={handleTextToSpeech}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t bg-background theme-transition">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="transition-all duration-200"
          >
            {isLoading ? (
              <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <SendIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
