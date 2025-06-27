'use client';

import Header from '@/components/Header';
import { getExperts, type Expert } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/context/ChatProvider';

export default function ExpertsPage() {
  const experts = getExperts();
  const { openChat, openChats } = useChat();

  const handleStartChat = (expert: Expert) => {
    openChat(expert);
  };

  const isChatOpen = (expertId: number) => {
    return openChats.some(chat => chat.id === expertId);
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="max-w-5xl mx-auto py-8 px-0 sm:px-4 animate-in fade-in duration-500">
        <div className="bg-card p-8 md:rounded-lg shadow-md mb-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Ask an Expert</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Connect with our trusted veterinarians, behaviorists, and our 24/7 AI assistant for pet care advice.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map(expert => (
            <Card 
              key={expert.id} 
              className="shadow-lg border bg-card transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary hover:-translate-y-1 cursor-pointer group relative rounded-none sm:rounded-lg"
              onClick={() => handleStartChat(expert)}
            >
              {isChatOpen(expert.id) && (
                <div className="absolute top-4 right-4 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
              )}
              <CardContent className="p-4 flex items-center gap-6">
                <Avatar className="h-20 w-20 flex-shrink-0">
                  <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                  <AvatarFallback className="text-3xl">{expert.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-headline text-xl font-bold">{expert.name}</h2>
                    {expert.isAi && <Badge variant="secondary">AI Assistant</Badge>}
                  </div>
                  <p className="font-semibold text-primary">{expert.specialty}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{expert.bio}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 flex-shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
