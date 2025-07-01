
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Heart, Flame, Sparkles, Dog, PlayCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, getPets, getPetById, getTrendingPets, getBreeds, type Pet, type Breed, type Post } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

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
    <Link href="#" className="group block break-inside-avoid">
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg rounded-lg flex flex-col border-0">
            <div className="relative w-full aspect-square bg-muted">
                <Image
                src={breed.imageUrl}
                alt={breed.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={breed.name}
                />
            </div>
            <CardContent className="p-4">
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{breed.name}</CardTitle>
                <CardDescription className="mt-2 text-sm line-clamp-3">
                    {breed.description}
                </CardDescription>
            </CardContent>
        </Card>
    </Link>
)

const PostCard = ({ post }: { post: Post }) => {
    const pet = getPetById(post.petId);
    if (!pet) return null;
    const hasVideo = post.media.some(m => m.type === 'video');

    return (
      <Card className="overflow-hidden flex flex-col group shadow-sm rounded-lg break-inside-avoid border-0">
        <Link href={`/posts/${post.id}`} className="block">
          <div className="relative aspect-square w-full bg-muted overflow-hidden">
            <Image
              src={post.media.find(m => m.type === 'image')?.url || 'https://placehold.co/400x300.png'}
              alt={post.caption?.replace(/<[^>]+>/g, '') || `Post by ${pet.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={pet.breed}
            />
             {hasVideo && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-12 w-12 text-white/80" />
                </div>
            )}
          </div>
        </Link>
        <CardContent className="p-3 flex flex-col">
          {post.caption && (
            <div className="text-sm font-medium text-foreground/90 line-clamp-3 mb-3">
                {post.caption?.replace(/<[^>]+>/g, '')}
            </div>
          )}
          <div className="flex items-center justify-between text-muted-foreground mt-auto">
            <Link href={`/pets/${pet.id}`} className="flex items-center gap-2 group/avatar flex-1 min-w-0">
              <Avatar className="h-7 w-7">
                <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-semibold group-hover/avatar:underline truncate">{pet.name}</span>
            </Link>
            <div className="flex items-center flex-shrink-0 gap-1.5 text-xs">
              <Heart className="h-4 w-4" />
              <span className="font-medium">{post.likes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}

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
            <TabsTrigger value="for-you" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="mr-2 h-4 w-4" /> For You
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Flame className="mr-2 h-4 w-4" /> Trending
            </TabsTrigger>
            <TabsTrigger value="breeds" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Dog className="mr-2 h-4 w-4" /> Breeds
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you" className="mt-4">
            <div className="columns-2 gap-2 space-y-2">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-4">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">Top Pets This Week</h2>
                    {trendingPets.map(pet => (
                        <PetRow key={pet.id} pet={pet} />
                    ))}
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">Newest Members</h2>
                    {newPets.map(pet => (
                        <PetRow key={pet.id} pet={pet} />
                    ))}
                </div>
            </div>
          </TabsContent>
          
          <TabsContent value="breeds" className="mt-4">
             <div className="columns-2 gap-2 space-y-2">
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
