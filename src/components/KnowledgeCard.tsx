
'use client';

import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { KnowledgeTip } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

interface KnowledgeCardProps {
  tip: KnowledgeTip;
}

export default function KnowledgeCard({ tip }: KnowledgeCardProps) {
  return (
    <Dialog>
      <Card className="rounded-lg shadow-sm border-2 border-primary/20 bg-primary/5 overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-headline text-lg text-primary">{tip.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80 line-clamp-3">
            {tip.content}
          </p>
          <DialogTrigger asChild>
            <Button variant="link" className="px-0 h-auto pt-2 text-primary">
              View All
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
             <BrainCircuit className="h-6 w-6 text-primary" />
             {tip.title}
          </DialogTitle>
          <DialogDescription className="pt-4 text-base text-foreground/90 whitespace-pre-wrap">
            {tip.content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
