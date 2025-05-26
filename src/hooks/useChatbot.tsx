
import { useState, useCallback, useEffect, useRef } from 'react';
import { sendMessage as apiSendMessage } from '../lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  liked?: boolean;
  disliked?: boolean;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Welcome to Bignalytics! How can I help you with your data analytics journey today?',
      sender: 'bot',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get bot response
      const botResponse = await apiSendMessage(inputValue);
      
      setMessages(prevMessages => [...prevMessages, {
        ...botResponse,
        id: `bot-${Date.now()}`
      }]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Add error message
      setMessages(prevMessages => [...prevMessages, {
        id: `error-${Date.now()}`,
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue]);

  const handleFeedback = useCallback((messageId: string, type: 'like' | 'dislike') => {
    setMessages(prevMessages => 
      prevMessages.map(message => {
        if (message.id === messageId) {
          if (type === 'like') {
            return {
              ...message,
              liked: !message.liked,
              disliked: false
            };
          } else {
            return {
              ...message,
              disliked: !message.disliked,
              liked: false
            };
          }
        }
        return message;
      })
    );
    
    // In a real app, you would send this feedback to your backend
    console.log(`Message ${messageId} received ${type} feedback`);
  }, []);

  const handleTextToSpeech = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser');
    }
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    handleFeedback,
    handleTextToSpeech,
    messagesEndRef
  };
}
