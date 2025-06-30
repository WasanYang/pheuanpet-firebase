import { getPostById, getPetById, getUserById, getCommentsByPostId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Media } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const MediaDisplay = ({ media, petName, caption }: { media: Media[], petName: string, caption: string | null }) => {
    const video = media.find(m => m.type === 'video');
    if (video) {
        return (
            <div className="w-full bg-black relative group">
                <video src={video.url} controls className="w-full h-auto max-h-[70vh] object-contain" />
            </div>
        );
    }

    const allImages = media.filter(m => m.type === 'image');
    if (allImages.length === 0) return null;
    
    if (allImages.length === 1) {
        return (
             <div className="relative aspect-[4/3] w-full">
                <Image
                    src={allImages[0].url}
                    alt={caption || `A photo of ${petName}`}
                    fill
                    className="object-cover"
                    data-ai-hint={`${petName} playing`}
                />
            </div>
        )
    }
    
    return (
        <Carousel className="w-full bg-muted relative group">
            <CarouselContent>
                {allImages.map((image, index) => (
                    <CarouselItem key={index}>
                       <div className="relative aspect-[4/3] w-full">
                         <Image
                            src={image.url}
                            alt={`${caption || `A photo of ${petName}`} (${index + 1})`}
                            fill
                            className="object-cover"
                            data-ai-hint={`${petName} playing`}
                        />
                       </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {allImages.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
            )}
        </Carousel>
    );
};


export default function PostPage({ params }: { params: { postId: string } }) {
  const post = getPostById(Number(params.postId));

  if (!post) {
    notFound();
  }

  const pet = getPetById(post.petId);
  const user = pet ? getUserById(pet.ownerId) : null;

  if (!pet || !user) {
    notFound();
  }

  const comments = getCommentsByPostId(post.id);
  const loggedInUser = getUserById(1); // Mock logged-in user

  return (
    <div className="bg-background min-h-screen text-foreground">
      <main className="max-w-3xl mx-auto py-4 px-0 sm:px-4 animate-in fade-in duration-500">
        <Card className="shadow-sm overflow-hidden rounded-none sm:rounded-lg border">
            <CardContent className="p-0">
                <MediaDisplay media={post.media} petName={pet.name} caption={post.caption} />
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Link href={`/pets/${pet.id}`}>
                            <Avatar className="h-12 w-12 border-2 border-primary">
                                <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                                <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex-grow">
                            <Link href={`/pets/${pet.id}`} className="font-bold text-lg hover:underline">{pet.name}</Link>
                            <p className="text-sm text-muted-foreground">
                                Posted by <Link href={`/users/${user.id}`} className="hover:underline">{user.name}</Link>
                            </p>
                        </div>
                    </div>

                    {post.caption && (
                        <div
                           className="prose-styles mb-4"
                           dangerouslySetInnerHTML={{ __html: post.caption }}
                        />
                    )}
                
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Heart className="h-5 w-5" />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageCircle className="h-5 w-5" />
                            <span>{post.comments}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t bg-card/50">
                    {/* Comment Input */}
                    {loggedInUser && (
                         <div className="flex items-start gap-3 p-4">
                            <Link href={`/users/${loggedInUser.id}`}>
                                <Avatar className="h-9 w-9 border-2 border-primary/50">
                                    <AvatarImage src={loggedInUser.avatarUrl} alt={loggedInUser.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="flex-1 relative">
                                <Textarea placeholder={`Comment as ${loggedInUser.name}...`} className="pr-20" rows={1} />
                                <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-8">Post</Button>
                            </div>
                        </div>
                    )}
                   

                    {/* Comments List */}
                    {comments.length > 0 && (
                        <div className="space-y-4 p-4 pt-0">
                             <div className="border-t -mx-4 mb-4"></div>
                            {comments.map(comment => {
                                const commenter = getUserById(comment.userId);
                                if (!commenter) return null;
                                return (
                                    <div key={comment.id} className="flex items-start gap-3">
                                        <Link href={`/users/${commenter.id}`}>
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={commenter.avatarUrl} alt={commenter.name} data-ai-hint="person portrait"/>
                                                <AvatarFallback>{commenter.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </Link>
                                        <div className="flex-1">
                                            <div className="bg-muted rounded-lg px-3 py-2">
                                                <div className="flex items-baseline gap-2">
                                                    <Link href={`/users/${commenter.id}`} className="font-bold text-sm hover:underline">{commenter.name}</Link>
                                                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                                </div>
                                                <p className="text-sm text-foreground/90 mt-1">{comment.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
