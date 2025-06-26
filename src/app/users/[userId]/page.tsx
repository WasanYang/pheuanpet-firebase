import Header from '@/components/Header';
import { getUserById, getPetsByOwnerId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const user = getUserById(Number(params.userId));

  if (!user) {
    notFound();
  }

  const pets = getPetsByOwnerId(user.id);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl py-8 px-4 animate-in fade-in duration-500">
        <Card className="overflow-hidden shadow-lg mb-12">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center md:text-left">
                <h1 className="font-headline text-4xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground text-lg">Pet Enthusiast</p>
                <div className="mt-4 flex justify-center md:justify-start items-center space-x-6">
                    <div className="text-center">
                        <p className="font-bold text-xl">{pets.length}</p>
                        <p className="text-sm text-muted-foreground">Pets</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-xl">1.2k</p>
                        <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-xl">340</p>
                        <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                </div>
                <Button className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <UserPlus className="mr-2 h-4 w-4" /> Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">{user.name}'s Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pets.map(pet => (
              <Link href={`/pets/${pet.id}`} key={pet.id}>
                <Card className="text-center overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative w-full">
                       <Image
                        src={pet.avatarUrl}
                        alt={pet.name}
                        fill
                        className="object-cover"
                        data-ai-hint={pet.breed}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-headline text-2xl">{pet.name}</CardTitle>
                    <p className="text-muted-foreground">{pet.breed}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
