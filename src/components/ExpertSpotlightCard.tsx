
import type { Expert } from '@/lib/data';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';

interface ExpertSpotlightCardProps {
  expert: Expert;
}

export default function ExpertSpotlightCard({ expert }: ExpertSpotlightCardProps) {
  return (
    <Card className="rounded-lg shadow-sm border bg-card overflow-hidden">
      <CardHeader className="pb-3">
         <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Expert Spotlight</span>
         </div>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Link href={`/users/${expert.userId}`}>
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint="person doctor" />
            <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <CardTitle className="text-base font-bold">{expert.name}</CardTitle>
          <CardDescription className="text-sm">{expert.specialty}</CardDescription>
          <Button asChild size="sm" variant="outline" className="mt-2">
            <Link href={`/users/${expert.userId}`}>
                View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
