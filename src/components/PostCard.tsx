'use client';

import type { Post, Pet, User, Media } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PostCardProps {
  post: Post;
  pet: Pet;
  user: User;
}

const MediaDisplay = ({ media, pet, caption }: { media: Media[], pet: Pet, caption: string | null }) => {
    const video = media.find(m => m.type === 'video');
    if (video) {
        return (
            <div className="w-full bg-black relative group aspect-video">
                <video src={video.url} controls className="w-full h-full object-contain" />
            </div>
        );
    }

    const allImages = media.filter(m => m.type === 'image');
    if (allImages.length === 0) return null;
    
    if (allImages.length === 1) {
        return (
             <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                    src={allImages[0].url}
                    alt={caption || `A photo of ${pet.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={`${pet.breed} playing`}
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
                            alt={`${caption || `A photo of ${pet.name}`} (${index + 1})`}
                            fill
                            className="object-cover"
                            data-ai-hint={`${pet.breed} playing`}
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

export default function PostCard({ post, pet, user }: PostCardProps) {
  return (
    <Card className="rounded-2xl shadow-lg border-none overflow-hidden bg-card/80">
        <div className="p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Link href={`/pets/${pet.id}`}>
                    <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary transition-colors">
                        <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <Link href={`/pets/${pet.id}`} className="font-bold text-foreground hover:underline">
                        {pet.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">by <Link href={`/users/${user.id}`} className="hover:underline">{user.name}</Link></p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
            </Button>
        </div>
        
        <Link href={`/posts/${post.id}`} className="block">
            <MediaDisplay media={post.media} pet={pet} caption={post.caption} />
        </Link>
        
        <div className="p-3 sm:p-4">
             <div className="flex items-center gap-4 mb-2">
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors group/heart">
                    <Heart className="h-6 w-6 group-hover/heart:fill-current" />
                </button>
                <Link href={`/posts/${post.id}#comments`} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-6 w-6" />
                </Link>
            </div>
            <p className="font-bold text-sm mb-1">{post.likes.toLocaleString()} likes</p>

             {post.caption && (
                <p className="text-sm text-foreground/90">
                    <Link href={`/pets/${pet.id}`} className="font-bold text-foreground hover:underline">{pet.name}</Link>
                    <span className="ml-1.5 line-clamp-2">{post.caption.replace(/\\n/g, ' ')}</span>
                </p>
            )}

            {post.comments > 0 && (
                <Link href={`/posts/${post.id}#comments`} className="text-sm text-muted-foreground hover:underline mt-1 block">
                    View all {post.comments} comments
                </Link>
            )}
        </div>
    </Card>
  );
}
