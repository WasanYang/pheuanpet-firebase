
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, Heart, Flame, Sparkles, Dog, PlayCircle, Hospital, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, getPets, getPetById, getTrendingPets, getBreeds, getExperts, type Pet, type Breed, type Post, type Expert } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PetRow = ({ pet }: { pet: Pet }) => (
  <div className="flex items-center justify-between gap-4">
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
        <div className="block">
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
        </div>
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
          <CardDescription className="mt-3 text-sm line-clamp-3 flex-grow text-muted-foreground/90">
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
          <TabsTrigger value="for-you" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1">
            <Sparkles className="mr-2 h-4 w-4" /> For You
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1">
            <Flame className="mr-2 h-4 w-4" /> Trending
          </TabsTrigger>
          <TabsTrigger value="breeds" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1">
            <Dog className="mr-2 h-4 w-4" /> Breeds
          </TabsTrigger>
          <TabsTrigger value="vet-connect" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1">
            <Hospital className="mr-2 h-4 w-4" /> VetConnect
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
            <div>
              <h3 className="text-xl font-bold mb-3">Top Pets This Week</h3>
              <div className="flex flex-col gap-4">
                {trendingPets.map(pet => (
                  <PetRow key={pet.id} pet={pet} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Newest Members</h3>
              <div className="flex flex-col gap-4">
                {newPets.map(pet => (
                  <PetRow key={pet.id} pet={pet} />
                ))}
              </div>
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
