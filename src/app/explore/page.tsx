'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Heart, MessageCircle, Flame, Sparkles, Dog } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, getPets, getPetById, getTrendingPets, getBreeds, type Pet, type Breed } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const PetRow = ({ pet }: { pet: Pet }) => (
  <div className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-muted">
    <Link href={`/pets/${pet.id}`} className="flex items-center gap-3 group flex-1 min-w-0">
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="font-bold group-hover:underline truncate">{pet.name}</p>
        <p className="text-sm text-muted-foreground truncate">{pet.breed}</p>
      </div>
    </Link>
    <Button variant="outline" size="sm" className="flex-shrink-0 px-4">Follow</Button>
  </div>
);

const BreedCard = ({ breed }: { breed: Breed }) => (
    <Link href="#" className="group block">
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg rounded-lg border">
            <div className="relative w-full aspect-square bg-muted">
                <Image
                src={breed.imageUrl}
                alt={breed.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={breed.name}
                />
            </div>
            <CardContent className="p-3">
                <CardTitle className="text-base font-bold group-hover:text-primary transition-colors truncate">{breed.name}</CardTitle>
            </CardContent>
        </Card>
    </Link>
)

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allPosts = getPosts();
  const trendingPets = getTrendingPets();
  const newPets = getPets().slice(0, 5); // Get first 5 as "new"
  const breeds = getBreeds();

  // In a real app, search would filter the results
  const filteredPosts = allPosts; 

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Explore the Universe</h1>
          <p className="text-muted-foreground mt-1">Discover new pets, friends, and communities.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for pets, breeds, or users..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you">
              <Sparkles className="mr-2 h-4 w-4" /> For You
            </TabsTrigger>
            <TabsTrigger value="trending">
              <Flame className="mr-2 h-4 w-4" /> Trending
            </TabsTrigger>
            <TabsTrigger value="breeds">
              <Dog className="mr-2 h-4 w-4" /> Breeds
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
              {filteredPosts.map((post) => {
                const pet = getPetById(post.petId);
                return (
                  <Link href={`/posts/${post.id}`} key={post.id} className="group relative block aspect-square">
                    <Image
                      src={post.media.find(m => m.type === 'image')?.url || 'https://placehold.co/400x400.png'}
                      alt={`Post by ${pet?.name || 'a pet'}`}
                      fill
                      className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={pet?.breed}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 rounded-md">
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1.5">
                          <Heart className="h-5 w-5" />
                          <span className="font-bold text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="h-5 w-5" />
                          <span className="font-bold text-sm">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-4">
            <div className="space-y-2">
                <h2 className="text-xl font-bold">Top Pets This Week</h2>
                {trendingPets.map(pet => (
                    <PetRow key={pet.id} pet={pet} />
                ))}
            </div>
             <div className="space-y-2 mt-8">
                <h2 className="text-xl font-bold">Newest Members</h2>
                {newPets.map(pet => (
                    <PetRow key={pet.id} pet={pet} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="breeds" className="mt-4">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {breeds.map(breed => (
                    <BreedCard key={breed.name} breed={breed} />
                ))}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
