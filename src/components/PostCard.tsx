'use client';

import type { Post, Pet, User, Media } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';
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

const MediaDisplay = ({ media, pet, caption }: { media: Media[], pet: Pet, caption:string | null }) => {
    const video = media.find(m => m.type === 'video');
    if (video) {
        return (
            <div className="w-full rounded-t-lg overflow-hidden bg-black relative group">
                <video src={video.url} controls className="w-full h-auto" />
            </div>
        );
    }

    const allImages = media.filter(m => m.type === 'image');
    if (allImages.length === 0) return null;
    
    return (
        <Carousel className="w-full rounded-t-lg overflow-hidden bg-muted relative group">
            <CarouselContent>
                {allImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={image.url}
                            alt={`${caption || `A photo of ${pet.name}`} (${index + 1})`}
                            width={500}
                            height={400}
                            className="object-cover w-full h-auto"
                            data-ai-hint={`${pet.breed} playing`}
                        />
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
    <div className="mb-4 break-inside-avoid">
        <Card className="overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <Link href={`/pets/${pet.id}`} className="cursor-pointer">
              <MediaDisplay media={post.media} pet={pet} caption={post.caption} />
            </Link>
            <div className="p-3">
              <Link href={`/pets/${pet.id}`} className="cursor-pointer">
                {post.caption && <p className="text-sm font-semibold text-foreground mb-2 line-clamp-2 hover:underline">{post.caption.split('\n')[0]}</p>}
              </Link>
              <div className="flex items-center gap-2">
                  <Link href={`/users/${user.id}`} className="flex items-center gap-2 flex-grow truncate">
                      <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground hover:underline">{user.name}</span>
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Heart className="h-3.5 w-3.5" />
                      <span>{post.likes}</span>
                  </div>
              </div>
            </div>
        </Card>
    </div>
  );
}
