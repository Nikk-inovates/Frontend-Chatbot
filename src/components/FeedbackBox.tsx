
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeedbackBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In a real app, you would send this to your backend
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
    
    // Reset after a few seconds
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50">
      {isOpen ? (
        <Card className={cn(
          "w-80 shadow-lg animate-fade-in theme-transition",
          "bg-card/95 backdrop-blur-sm"
        )}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Send Feedback</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              Help us improve our chatbot assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-4 text-center animate-fade-in">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Thank you for your feedback!
                </p>
              </div>
            ) : (
              <Textarea
                placeholder="What can we improve?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none focus-visible:ring-primary"
                rows={4}
              />
            )}
          </CardContent>
          {!submitted && (
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleSubmit}
                disabled={!feedback.trim()}
              >
                Submit Feedback
              </Button>
            </CardFooter>
          )}
        </Card>
      ) : (
        <Button
          className="h-12 w-12 rounded-full shadow-lg animate-pulse-subtle"
          onClick={() => setIsOpen(true)}
          aria-label="Open feedback form"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
