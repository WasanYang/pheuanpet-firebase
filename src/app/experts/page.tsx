
'use client';

import { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { getExperts, type Expert } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

const ExpertCard = ({ expert }: { expert: Expert }) => {
  return (
    <Link href={`/users/${expert.userId}`} className="group block h-full">
      <Card className="h-full flex flex-col rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-card/80 hover:bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
          <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20 group-hover:border-primary transition-colors duration-300">
              <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint="person doctor" />
              <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-xl">{expert.name}</CardTitle>
          <p className="text-primary font-semibold text-sm mt-1">{expert.specialty}</p>
          <CardDescription className="mt-3 text-sm line-clamp-3 text-muted-foreground/90">
            {expert.bio}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function VetConnectDirectoryPage() {
  // We only want to show human experts on this page
  const experts = getExperts().filter(expert => !expert.isAi);
  const [location, setLocation] = useState('all');

  const locations = [
    { value: 'all', label: 'ทั่วประเทศ' },
    { value: 'bangkok', label: 'กรุงเทพมหานคร' },
    { value: 'chiangmai', label: 'เชียงใหม่' },
    { value: 'phuket', label: 'ภูเก็ต' },
    { value: 'khonkaen', label: 'ขอนแก่น' },
  ];

  // In a real app, you would filter experts based on the selected location.
  // For now, we'll just display all of them.
  const filteredExperts = experts;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground animate-in fade-in duration-500">
      
      <main className="flex-1 w-full">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="เลือกตำแหน่ง" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} />
            ))}
        </div>
      </main>
    </div>
  );
}
