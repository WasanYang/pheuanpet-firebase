import Header from '@/components/Header';
import { getExperts } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ExpertsPage() {
  const experts = getExperts();

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-3xl py-8 px-4 animate-in fade-in duration-500">
        <div className="mb-10 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Ask an Expert</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Connect with our trusted veterinarians, behaviorists, and our 24/7 AI assistant for pet care advice.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {experts.map(expert => (
            <Link href={`/experts/${expert.id}`} key={expert.id} className="block group">
              <Card className="shadow-md border-transparent border-2 bg-card/80 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                <CardContent className="p-6 flex items-center gap-6">
                  <Avatar className="h-20 w-20 border-4 border-primary/20 group-hover:border-primary transition-colors flex-shrink-0">
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
                  <MessageSquare className="h-8 w-8 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:translate-x-1 flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}