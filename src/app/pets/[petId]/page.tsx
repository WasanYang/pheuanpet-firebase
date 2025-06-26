import Header from '@/components/Header';
import { getPetById, getPostsByPetId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PawPrint, User } from 'lucide-react';

export default function PetProfilePage({ params }: { params: { petId: string } }) {
  const pet = getPetById(Number(params.petId));

  if (!pet) {
    notFound();
  }

  const posts = getPostsByPetId(pet.id);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl py-8 px-4 animate-in fade-in duration-500">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center md:text-left">
                <h1 className="font-headline text-4xl font-bold">{pet.name}</h1>
                <p className="text-muted-foreground text-lg">{pet.breed}</p>
                <p className="mt-4">{pet.personality}</p>
                <div className="mt-4 flex justify-center md:justify-start space-x-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <PawPrint className="mr-2 h-4 w-4" /> Follow {pet.name}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/users/${pet.ownerId}`}>
                      <User className="mr-2 h-4 w-4" /> View Owner
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold mb-6 text-center">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map(post => (
              <div key={post.id} className="group relative aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={post.imageUrl}
                  alt={post.caption || `A photo of ${pet.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={`${pet.breed} playing`}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <p className="text-white text-center text-sm">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
