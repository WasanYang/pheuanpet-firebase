'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { getUserById, getPetsByOwnerId, getExpertByUserId, type Expert } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatProvider';

export default function UserProfilePage() {
  const params = useParams<{ userId: string }>();
  const { openChat } = useChat();
  const user = getUserById(Number(params.userId));

  if (!user) {
    notFound();
  }

  const pets = getPetsByOwnerId(user.id);
  const expertInfo = getExpertByUserId(user.id);

  const handleStartChat = () => {
    if (expertInfo) {
      // It's an expert, use their full profile
      openChat(expertInfo);
    } else {
      // It's a regular user, create a temporary Expert object
      const tempExpertForUser: Expert = {
        id: user.id + 1000, // Use a unique ID scheme to avoid conflicts with real expert IDs
        userId: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        specialty: 'Pet Lover', // Generic title for regular users
        bio: `This is a chat with ${user.name}. Say hello!`,
        description: '',
        isAi: false,
        costPerMessage: 0,
      };
      openChat(tempExpertForUser);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="max-w-4xl mx-auto py-2 px-0 sm:px-4 animate-in fade-in duration-500">
        <Card className="overflow-hidden shadow-lg border-none bg-card/80 mb-0.5 rounded-none sm:rounded-lg">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center sm:text-left">
                <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight">{user.name}</h1>
                {expertInfo && (
                   <p className="font-semibold text-primary text-lg mt-1">{expertInfo.specialty}</p>
                )}
                
                <div className="mt-4 flex justify-center sm:justify-start gap-6 text-center">
                    <div>
                        <p className="font-bold text-xl">{pets.length}</p>
                        <p className="text-sm text-muted-foreground">Pets</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">1.2k</p>
                        <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">340</p>
                        <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                </div>

                <p className="mt-4 text-sm max-w-prose">
                  {expertInfo ? expertInfo.bio : "A passionate animal lover and proud parent to some of the most wonderful pets you'll ever meet. Following our adventures!"}
                </p>
                
                <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <UserPlus className="mr-2 h-4 w-4" /> Follow {user.name}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleStartChat}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {expertInfo ? 'Consult' : 'Message'}
                    </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold my-6">{expertInfo ? "Posts" : `${user.name}'s Pets`}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3">
            {pets.map(pet => (
              <Link href={`/pets/${pet.id}`} key={pet.id} className="group block">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col h-full rounded-none sm:rounded-lg">
                  <div className="relative w-full aspect-square flex-shrink-0 bg-muted">
                     <Image
                      src={pet.avatarUrl}
                      alt={pet.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={pet.breed}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{pet.name}</CardTitle>
                    <p className="font-semibold text-muted-foreground text-sm">{pet.breed}</p>
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-3 flex-grow">{pet.personality}</p>
                  </div>
                </Card>
              </Link>
            ))}
             {pets.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-10">
                    {expertInfo ? "This expert hasn't posted anything yet." : `${user.name} hasn't added any pets yet.`}
                </p>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
