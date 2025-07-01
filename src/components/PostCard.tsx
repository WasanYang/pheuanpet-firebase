'use client';

import type { Post, Pet, User, Media } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect, useRef } from 'react';

interface PostCardProps {
  post: Post;
  pet: Pet;
  user: User;
}

const MediaDisplay = ({ media, pet, caption }: { media: Media[], pet: Pet, caption: string | null }) => {
    const video = media.find(m => m.type === 'video');
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
 
    useEffect(() => {
        if (!api) {
            return
        }
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

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
                    alt={caption?.replace(/<[^>]+>/g, '') || `A photo of ${pet.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={`${pet.breed} playing`}
                />
            </div>
        )
    }
    
    return (
        <div className="relative">
            <Carousel setApi={setApi} className="w-full bg-muted relative group">
                <CarouselContent>
                    {allImages.map((image, index) => (
                        <CarouselItem key={index}>
                           <div className="relative aspect-[4/3] w-full">
                             <Image
                                src={image.url}
                                alt={`${caption?.replace(/<[^>]+>/g, '') || `A photo of ${pet.name}`} (${index + 1})`}
                                fill
                                className="object-cover"
                                data-ai-hint={`${pet.breed} playing`}
                            />
                           </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
             {count > 1 && (
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full pointer-events-none flex items-center gap-1">
                    {current}/{count}
                </div>
            )}
        </div>
    );
};

export default function PostCard({ post, pet, user }: PostCardProps) {
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const plainCaption = post.caption?.replace(/<[^>]+>/g, '') || '';

  useEffect(() => {
    const element = captionRef.current;
    if (element) {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      if (hasOverflow !== isClamped) {
        setIsClamped(hasOverflow);
      }
    }
  }, [plainCaption, isClamped]);

  return (
    <Card className="rounded-lg shadow-sm border overflow-hidden bg-card flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
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
        
        {post.caption && (
            <div className="px-4 pb-3">
                 <div className="text-sm text-foreground/90">
                    <p ref={captionRef} className="line-clamp-3">
                      {plainCaption}
                    </p>
                    {isClamped && (
                      <Link href={`/posts/${post.id}`} className="text-sm font-semibold text-primary hover:underline">
                        view more
                      </Link>
                    )}
                 </div>
            </div>
        )}

        <div className="mt-auto">
            <Link href={`/posts/${post.id}`} className="block">
                <MediaDisplay media={post.media} pet={pet} caption={post.caption} />
            </Link>
            
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center -ml-2">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 group/heart">
                            <Heart className="h-6 w-6 group-hover/heart:fill-current" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                            <Link href={`/posts/${post.id}#comments`}>
                                <MessageCircle className="h-6 w-6" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Share2 className="h-6 w-6" />
                        </Button>
                    </div>
                    <p className="font-bold text-sm">{post.likes.toLocaleString()} likes</p>
                </div>
            </div>
        </div>
    </Card>
  );
}
