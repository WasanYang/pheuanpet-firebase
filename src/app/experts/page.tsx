import Header from '@/components/Header';
import { getExperts } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ExpertsPage() {
  const experts = getExperts();

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-2xl py-8 px-4 animate-in fade-in duration-500">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Ask an Expert</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Get advice from our trusted veterinarians and pet care specialists.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {experts.map(expert => (
            <Link href={`/experts/${expert.id}`} key={expert.id} className="block group">
              <Card className="shadow-lg border-none bg-card/80 transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? "robot" : "person doctor"} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h2 className="font-bold text-lg group-hover:text-primary transition-colors">{expert.name}</h2>
                    <p className="text-sm font-semibold text-primary">{expert.specialty}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{expert.bio}</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
