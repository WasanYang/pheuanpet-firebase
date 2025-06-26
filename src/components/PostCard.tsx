'use client';

import type { Post, Pet, User } from '@/lib/data';
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

export default function PostCard({ post, pet, user }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg animate-in fade-in zoom-in-95">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
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
      <CardContent className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={post.imageUrl}
            alt={post.caption || `A photo of ${pet.name}`}
            fill
            className="object-cover"
            data-ai-hint={`${pet.breed} pet`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex w-full items-center">
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
        <div className="px-2 py-1 w-full">
            <p className="font-semibold text-sm">{isLiked ? post.likes + 1 : post.likes} likes</p>
            <p className="text-sm mt-1">
                <Link href={`/pets/${pet.id}`} className="font-bold hover:underline">{pet.name}</Link>
                <span className="ml-2">{post.caption}</span>
            </p>
            <Link href="#" className="text-sm text-muted-foreground mt-1 hover:underline">
                View all {post.comments} comments
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
