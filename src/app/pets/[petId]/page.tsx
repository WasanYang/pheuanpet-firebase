
import { getPetById, getPostsByPetId, type Pet, type Media } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PawPrint, User, PlayCircle, Grid, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostMediaDisplay = ({ media, pet, postId }: { media: Media[], pet: Pet, postId: number }) => {
    const video = media.find(m => m.type === 'video');
    const images = media.filter(m => m.type === 'image');
    
    if (video) {
        return (
            <Link href={`/posts/${postId}`} className="block group">
                <div className="relative aspect-video w-full bg-muted overflow-hidden rounded-md">
                     <Image
                        src={images.length > 0 ? images[0].url : 'https://placehold.co/600x400.png'}
                        alt={`Post by ${pet.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} playing`}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white/80" />
                    </div>
                </div>
            </Link>
        )
    }

    const imagesToShow = images.slice(0, 3);

    if (imagesToShow.length === 0) return null;

    if (imagesToShow.length === 1) {
        return (
            <Link href={`/posts/${postId}`} className="block group">
                <div className="relative aspect-video w-full bg-muted overflow-hidden rounded-md">
                    <Image
                        src={imagesToShow[0].url}
                        alt={`A photo from a post by ${pet.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} playing`}
                    />
                </div>
            </Link>
        )
    }

    if (imagesToShow.length === 2) {
        return (
             <Link href={`/posts/${postId}`} className="block group">
                <div className="grid grid-cols-2 gap-1 aspect-video bg-muted rounded-md overflow-hidden">
                    {imagesToShow.map((image, index) => (
                        <div key={index} className="relative w-full h-full overflow-hidden">
                            <Image
                                src={image.url}
                                alt={`A photo from a post by ${pet.name} (${index+1})`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={`${pet.breed} photo`}
                            />
                        </div>
                    ))}
                </div>
            </Link>
        );
    }
    
    // 3 or more images
    return (
        <Link href={`/posts/${postId}`} className="block group">
            <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-video bg-muted rounded-md overflow-hidden">
                <div className="relative row-span-2">
                    <Image
                        src={imagesToShow[0].url}
                        alt={`A photo from a post by ${pet.name} (1)`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} photo`}
                    />
                </div>
                <div className="relative">
                    <Image
                        src={imagesToShow[1].url}
                        alt={`A photo from a post by ${pet.name} (2)`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} photo`}
                    />
                </div>
                <div className="relative">
                    <Image
                        src={imagesToShow[2].url}
                        alt={`A photo from a post by ${pet.name} (3)`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={`${pet.breed} photo`}
                    />
                    {images.length > 3 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-2xl">
                           +{images.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};


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
    <div className="bg-background min-h-screen text-foreground animate-in fade-in duration-500">
      <main className="w-full">
        <Card className="overflow-hidden shadow-sm border bg-card/80 rounded-lg mb-4">
          <CardContent className="p-0">
             <div className="p-4">
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
            </div>
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-t bg-card p-0">
                <TabsTrigger value="posts" className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground">
                    <Grid className="mr-2 h-4 w-4" />Posts
                </TabsTrigger>
                <TabsTrigger value="media" className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground">
                    <ImageIcon className="mr-2 h-4 w-4" />Media
                </TabsTrigger>
                </TabsList>
                <div className="p-4">
                <TabsContent value="posts" className="mt-0">
                    <div className="flex flex-col gap-4">
                    {posts.map(post => (
                        <Card key={post.id} className="overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg rounded-lg border">
                            <CardContent className="p-4 flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-1/3 md:w-1/4 flex-shrink-0">
                                    <PostMediaDisplay media={post.media} pet={pet} postId={post.id} />
                                </div>
                                <div className="flex-grow">
                                {post.caption && (
                                    <p className="text-sm text-foreground mb-4 whitespace-pre-wrap line-clamp-4">{post.caption.replace(/<[^>]+>/g, '')}</p>
                                )}
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Heart className="h-5 w-5" />
                                            <span>{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MessageCircle className="h-5 w-5" />
                                            <span>{post.comments}</span>
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="sm" asChild>
                                        <Link href={`/posts/${post.id}`}>View Post</Link>
                                    </Button>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                        ))}
                    {posts.length === 0 && <p className="col-span-full text-center text-muted-foreground py-10">This pet hasn't posted anything yet.</p>}
                    </div>
                </TabsContent>

                <TabsContent value="media" className="mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-0.5">
                    {allMedia.map((media, index) => (
                        <Link href={`/posts/${media.postId}`} key={`${media.url}-${index}`} className="group block">
                        <div className="relative aspect-square w-full bg-muted overflow-hidden rounded-md">
                            {media.type === 'image' ? (
                            <Image
                                src={media.url}
                                alt={`A photo from a post by ${media.petName}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={`${pet.breed} photo`}
                            />
                            ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black">
                                <div className="relative w-full h-full">
                                    <Image
                                    src={posts.find(p => p.id === media.postId)?.media.find(m => m.type === 'image')?.url || 'https://placehold.co/400x400.png'}
                                    alt={`Video thumbnail`}
                                    fill
                                    className="object-cover opacity-50"
                                    data-ai-hint={`${pet.breed} playing`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PlayCircle className="h-1/3 w-1/3 text-white/70" />
                                    </div>
                                </div>
                            </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </div>
                        </Link>
                    ))}
                    </div>
                    {allMedia.length === 0 && <p className="text-center text-muted-foreground py-10">No media found.</p>}
                </TabsContent>
                </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
