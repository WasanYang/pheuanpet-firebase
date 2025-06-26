'use client';

import type { Post, Pet, User, Media } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Heart, MessageCircle, Send, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  pet: Pet;
  user: User;
}

const MediaDisplay = ({ media, pet, caption }: { media: Media[], pet: Pet, caption: string | null }) => {
    const video = media.find(m => m.type === 'video');
    if (video) {
        return (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                <video src={video.url} controls className="w-full h-full object-cover" />
            </div>
        );
    }

    const allImages = media.filter(m => m.type === 'image');
    if (allImages.length === 0) {
        return (
            <div className="aspect-[4/3] w-full bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">No media available</p>
            </div>
        );
    }

    if (allImages.length === 1) {
        return (
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={allImages[0].url}
                    alt={caption || `A photo of ${pet.name}`}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={`${pet.breed} playing`}
                />
            </div>
        );
    }

    if (allImages.length === 2) {
        return (
            <div className="grid grid-cols-2 gap-2 aspect-[4/3]">
                {allImages.map((image, index) => (
                    <div key={index} className="relative w-full h-full">
                        <Image
                            src={image.url}
                            alt={`${caption || `A photo of ${pet.name}`} (${index + 1})`}
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint={`${pet.breed} playing`}
                        />
                    </div>
                ))}
            </div>
        )
    }

    const displayedImages = allImages.slice(0, 3);
    const remainingCount = allImages.length - 3;
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-[4/3]">
            <div className="col-span-2 row-span-1 relative">
                <Image
                    src={displayedImages[0].url}
                    alt={`${caption || `A photo of ${pet.name}`} (1)`}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={`${pet.breed} playing`}
                />
            </div>
            <div className="col-span-1 row-span-1 relative">
                <Image
                    src={displayedImages[1].url}
                    alt={`${caption || `A photo of ${pet.name}`} (2)`}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={`${pet.breed} playing`}
                />
            </div>
            <div className="col-span-1 row-span-1 relative">
                <Image
                    src={displayedImages[2].url}
                    alt={`${caption || `A photo of ${pet.name}`} (3)`}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={`${pet.breed} playing`}
                />
                {remainingCount > 0 && (
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <span className="text-white text-2xl font-bold">+{remainingCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function PostCard({ post, pet, user }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg animate-in fade-in">
        <div className="grid md:grid-cols-2">
            <div className="w-full h-full p-2 flex items-center justify-center bg-muted/30">
                <MediaDisplay media={post.media} pet={pet} caption={post.caption} />
            </div>
            <div className="flex flex-col p-4">
                <CardHeader className="flex flex-row items-center gap-3 p-0">
                    <Link href={`/pets/${pet.id}`}>
                        <Avatar>
                            <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                            <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="grid gap-0.5">
                        <Link href={`/pets/${pet.id}`} className="font-bold hover:underline">{pet.name}</Link>
                        <Link href={`/users/${user.id}`} className="text-sm text-muted-foreground hover:underline">{user.name}</Link>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                        <MoreHorizontal />
                    </Button>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex-grow">
                     {post.caption && <p className="text-sm text-foreground/90 whitespace-pre-line">{post.caption}</p>}
                </CardContent>
                <CardFooter className="flex flex-col items-start p-0 mt-auto pt-4">
                    <div className="flex w-full items-center -ml-2">
                        <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                            <Heart className={cn("h-6 w-6", isLiked && "fill-destructive text-destructive")} />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageCircle className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Send className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="py-1 w-full">
                        <p className="font-semibold text-sm">{isLiked ? post.likes + 1 : post.likes} likes</p>
                        <Link href="#" className="text-sm text-muted-foreground mt-1 hover:underline">
                            View all {post.comments} comments
                        </Link>
                    </div>
                </CardFooter>
            </div>
        </div>
    </Card>
  );
}
