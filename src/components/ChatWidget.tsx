
'use client';

import { useState, useEffect, useRef } from 'react';
import type { Expert } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal, User, Minus, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { expertChat, type ExpertChatInput } from '@/ai/flows/expert-chat-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useChat } from '@/context/ChatProvider';

type Message = {
  role: 'user' | 'model';
  content: string;
};

interface ChatWidgetProps {
    expert: Expert;
}

export default function ChatWidget({ expert }: ChatWidgetProps) {
  const { toast } = useToast();
  const { 
    closeChat, 
    setActiveChat, 
    activeChatId, 
    toggleMinimize, 
    minimizedChats,
    tokens,
    deductTokens,
  } = useChat();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMinimized = minimizedChats.has(expert.id);
  const isActive = activeChatId === expert.id;
  const cannotAfford = expert.isAi && tokens < expert.costPerMessage;

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
        setMessages([
          { role: 'model', content: `Hello! I'm ${expert.name}. ${expert.bio}\n\nHow can I help you and your pet today?` }
        ]);
    }
  }, [expert, messages.length]);

  useEffect(() => {
    if (!isMinimized) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isMinimized]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || cannotAfford) return;

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
        deductTokens(expert.costPerMessage);
      } catch (error) {
        console.error("AI Error:", error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not get a response from the AI assistant. Please try again.',
        });
        setMessages(messages); // Revert on error, don't deduct tokens
      } finally {
        setIsLoading(false);
      }
    } else {
      // Mock for human expert
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', content: "Thanks for your message! I'll get back to you as soon as possible." }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div 
        className={cn(
            "w-80 h-[28rem] transition-all duration-300 ease-in-out", 
            isMinimized && 'h-12'
        )}
        onClick={() => setActiveChat(expert.id)}
    >
      <Card className={cn(
        "flex-1 flex flex-col shadow-xl border-t-2 border-primary w-full h-full transition-opacity",
        !isActive && !isMinimized && 'opacity-80'
        )}>
          <CardHeader 
            className="flex flex-row items-center justify-between gap-4 p-2 border-b cursor-pointer hover:bg-muted/50"
            onClick={() => toggleMinimize(expert.id)}
            >
            <div className="flex items-center gap-2 truncate">
                 <Avatar className="h-8 w-8">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="truncate">
                    <h1 className="font-bold text-sm truncate">{expert.name}</h1>
                </div>
            </div>
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); toggleMinimize(expert.id)}}>
                    <Minus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); closeChat(expert.id)}}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
            <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-2", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {message.role === 'model' && (
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    )}
                    <div className={cn(
                    "p-2 px-3 rounded-2xl max-w-xs",
                    message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-muted rounded-bl-none'
                    )}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={'https://placehold.co/100x100.png'} alt={'User'} data-ai-hint="person" />
                        <AvatarFallback><User size={14} /></AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-2 justify-start">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-2xl bg-muted rounded-bl-none flex gap-1 items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-2 border-t bg-background/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={cannotAfford ? "เติม Token เพื่อสนทนาต่อ" : "Type your message..."}
                    className="flex-1 resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e as any);
                    }
                    }}
                    disabled={isLoading || cannotAfford}
                />
                <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading || !input.trim() || cannotAfford}>
                    <SendHorizonal className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
                </form>
            </div>
            </>
          )}
        </Card>
    </div>
  );
}
