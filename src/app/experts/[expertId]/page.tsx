'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { getExpertById } from '@/lib/data';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { expertChat, type ExpertChatInput } from '@/ai/flows/expert-chat-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function ExpertChatPage({ params }: { params: { expertId: string } }) {
  const expert = getExpertById(Number(params.expertId));
  const { toast } = useToast();
  // Initialize with a welcome message
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expert) {
        setMessages([
          { role: 'model', content: `Hello! I'm ${expert.name}. ${expert.bio}\n\nHow can I help you and your pet today?` }
        ]);
    }
  }, [expert]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  if (!expert) {
    notFound();
  }
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    if (expert.isAi) {
      try {
        const chatHistory: ExpertChatInput = { history: newMessages };
        const aiResponse = await expertChat(chatHistory);
        setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
      } catch (error) {
        console.error("AI Error:", error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not get a response from the AI assistant. Please try again.',
        });
        setMessages(newMessages); // Revert to only user message on error
      } finally {
        setIsLoading(false);
      }
    } else {
      // Mock response for human experts
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', content: "Thanks for your message! I'll get back to you as soon as possible." }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col">
      <Header />
      <main className="container mx-auto max-w-2xl py-8 px-4 flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg border-none bg-card/80">
          <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
              <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-lg">{expert.name}</h1>
              <p className="text-sm text-muted-foreground">{expert.specialty}</p>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'model' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn(
                  "p-3 rounded-2xl max-w-sm md:max-w-md",
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-muted rounded-bl-none'
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={'https://placehold.co/100x100.png'} alt={'User'} data-ai-hint="person" />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-2xl bg-muted rounded-bl-none flex gap-1 items-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></span>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-background/50">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as any);
                  }
                }}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <SendHorizonal className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}
