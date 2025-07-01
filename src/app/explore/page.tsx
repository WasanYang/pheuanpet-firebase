
'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Heart, Flame, Sparkles, Dog, PlayCircle, Hospital, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, getPets, getPetById, getUserById, getTrendingPets, getBreeds, getExperts, type Pet, type Breed, type Post, type Expert } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PostCard from '@/components/PostCard';


const PetRow = ({ pet }: { pet: Pet }) => (
  <div className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50">
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
    <Link href="#" className="group block h-full">
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg rounded-lg flex flex-col items-start h-full shadow-sm border-0 bg-card/80 hover:bg-card">
            <div className="relative w-full aspect-square bg-muted">
                <Image
                src={breed.imageUrl}
                alt={breed.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={breed.name}
                />
            </div>
            <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{breed.name}</CardTitle>
                <CardDescription className="mt-2 text-sm line-clamp-3">
                    {breed.description}
                </CardDescription>
            </CardContent>
        </Card>
    </Link>
)

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

function ExploreContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'for-you';
  
  const [searchTerm, setSearchTerm] = useState('');
  const allPosts = getPosts();
  const trendingPets = getTrendingPets();
  const newPets = getPets().slice(0, 5); // Get first 5 as "new"
  const breeds = getBreeds();
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

  // In a real app, search would filter the results
  const filteredPosts = allPosts; 

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for pets, breeds, or experts..."
          className="w-full pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="for-you" className="flex-1">
            <Sparkles className="mr-2 h-4 w-4" /> For You
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex-1">
            <Flame className="mr-2 h-4 w-4" /> Trending
          </TabsTrigger>
          <TabsTrigger value="breeds" className="flex-1">
            <Dog className="mr-2 h-4 w-4" /> Breeds
          </TabsTrigger>
          <TabsTrigger value="vet-connect" className="flex-1">
            <Hospital className="mr-2 h-4 w-4" /> VetConnect
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="for-you" className="mt-4">
            <div className="columns-2 gap-4 space-y-4">
                {filteredPosts.map((post) => {
                    const pet = getPetById(post.petId);
                    const user = pet ? getUserById(pet.ownerId) : null;
                    if (!pet || !user) {
                        return null;
                    }
                    return (
                        <div key={post.id} className="break-inside-avoid">
                           <PostCard post={post} pet={pet} user={user} />
                        </div>
                    );
                })}
            </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Top Pets This Week</h3>
              <div className="rounded-lg border">
                {trendingPets.map((pet, index) => (
                    <React.Fragment key={pet.id}>
                        <PetRow pet={pet} />
                        {index < trendingPets.length - 1 && <div className="border-b" />}
                    </React.Fragment>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Newest Members</h3>
              <div className="rounded-lg border">
                {newPets.map((pet, index) => (
                    <React.Fragment key={pet.id}>
                        <PetRow pet={pet} />
                        {index < newPets.length - 1 && <div className="border-b" />}
                    </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="breeds" className="mt-4">
           <div className="grid grid-cols-2 gap-4">
              {breeds.map(breed => (
                  <BreedCard key={breed.name} breed={breed} />
              ))}
           </div>
        </TabsContent>

        <TabsContent value="vet-connect" className="mt-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {filteredExperts.map(expert => (
                  <ExpertCard key={expert.id} expert={expert} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
