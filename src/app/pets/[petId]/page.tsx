
import Header from '@/components/Header';
import { getPetById, getPostsByPetId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PawPrint, User, PlayCircle, Grid, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PetProfilePage({ params }: { params: { petId: string } }) {
  const pet = getPetById(Number(params.petId));

  if (!pet) {
    notFound();
  }

  const posts = getPostsByPetId(pet.id);
  const allMedia = posts.flatMap(post =>
    post.media.map(mediaItem => ({
      ...mediaItem,
      postId: post.id,
      petName: pet.name,
    }))
  );


  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl py-6 sm:py-8 px-4 animate-in fade-in duration-500">
        <Card className="overflow-hidden shadow-lg border-none bg-card/80 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-28 h-28 sm:w-36 sm:h-36 border-4 border-primary shadow-md">
                <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                <AvatarFallback className="text-4xl">{pet.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-center sm:text-left">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">{pet.name}</h1>
                <p className="text-muted-foreground text-lg mt-1">{pet.breed}</p>
                
                <div className="mt-4 flex justify-center sm:justify-start gap-6 text-center">
                    <div>
                        <p className="font-bold text-xl">{posts.length}</p>
                        <p className="text-sm text-muted-foreground">Posts</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">4,218</p>
                        <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl">102</p>
                        <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                </div>

                <p className="mt-4 text-sm max-w-prose">{pet.personality}</p>
                
                <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <PawPrint className="mr-2 h-4 w-4" /> Follow
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/users/${pet.ownerId}`}>
                      <User className="mr-2 h-4 w-4" /> View Owner
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="posts"><Grid className="mr-2 h-4 w-4" />Posts</TabsTrigger>
            <TabsTrigger value="media"><ImageIcon className="mr-2 h-4 w-4" />Media</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map(post => {
                const firstMedia = post.media[0];
                if (!firstMedia) return null;

                return (
                  <Link href={`/posts/${post.id}`} key={post.id} className="group block h-full">
                    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative aspect-video w-full bg-muted">
                        {firstMedia.type === 'image' ? (
                          <Image
                            src={firstMedia.url}
                            alt={post.caption || `A photo of ${pet.name}`}
                            fill
                            className="object-cover"
                            data-ai-hint={`${pet.breed} playing`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black/10">
                            <PlayCircle className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 flex-grow">
                        {post.caption ? (
                          <p className="text-sm text-foreground line-clamp-2 font-medium group-hover:underline">{post.caption.split('\n')[0]}</p>
                        ) : (
                           <p className="text-sm text-muted-foreground italic group-hover:underline">View Post</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
              {posts.length === 0 && <p className="col-span-full text-center text-muted-foreground py-10">This pet hasn't posted anything yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 sm:gap-2">
              {allMedia.map((media, index) => (
                <Link href={`/posts/${media.postId}`} key={`${media.url}-${index}`} className="group block">
                  <div className="relative aspect-square w-full bg-muted rounded-md overflow-hidden">
                    {media.type === 'image' ? (
                      <Image
                        src={media.url}
                        alt={`A photo from a post by ${media.petName}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} photo`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/50">
                        <PlayCircle className="h-1/3 w-1/3 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  </div>
                </Link>
              ))}
            </div>
             {allMedia.length === 0 && <p className="text-center text-muted-foreground py-10">No media found.</p>}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
