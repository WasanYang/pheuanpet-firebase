
import Header from '@/components/Header';
import { getUserById, getPetsByOwnerId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, PawPrint } from 'lucide-react';

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const user = getUserById(Number(params.userId));

  if (!user) {
    notFound();
  }

  const pets = getPetsByOwnerId(user.id);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl py-6 sm:py-8 px-4 animate-in fade-in duration-500">
        <Card className="overflow-hidden shadow-lg border-none bg-card/80 mb-8 md:mb-12">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-primary shadow-md">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center sm:text-left">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-muted-foreground text-lg mt-1">Pet Lover Extraordinaire</p>
                
                <div className="mt-4 flex justify-center sm:justify-start gap-6 text-center">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-bold text-xl">{pets.length}</p>
                            <p className="text-sm text-muted-foreground">Pets</p>
                        </div>
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

                <Button size="sm" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <UserPlus className="mr-2 h-4 w-4" /> Follow {user.name}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-6 text-center">{user.name}'s Wonderful Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {pets.map(pet => (
              <Link href={`/pets/${pet.id}`} key={pet.id} className="group">
                <Card className="text-center overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative w-full">
                       <Image
                        src={pet.avatarUrl}
                        alt={pet.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={pet.breed}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-xl sm:text-2xl">{pet.name}</CardTitle>
                    <p className="text-muted-foreground">{pet.breed}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
             {pets.length === 0 && <p className="col-span-full text-center text-muted-foreground py-10">{user.name} hasn't added any pets yet.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
