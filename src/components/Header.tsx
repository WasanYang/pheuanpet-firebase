'use client';

import { PawPrint, Home, PlusSquare, Search, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/data';
import { Input } from './ui/input';
import { useChat } from '@/context/ChatProvider';

const Header = () => {
  const user = getUserById(1); // Mock logged-in user
  const { openChats } = useChat();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-4xl items-center mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <PawPrint className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold hidden sm:inline-block">PheuanPet</span>
        </Link>
        
        <div className="flex-1 flex justify-center px-4 lg:px-8">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search pets, users..."
                    className="w-full pl-9"
                />
            </div>
        </div>

        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/experts" aria-label="Ask an Expert">
                <Stethoscope className="h-5 w-5" />
              </Link>
            </Button>
            {openChats.length > 0 && (
              <div className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/create" aria-label="Create Post">
              <PlusSquare className="h-5 w-5" />
            </Link>
          </Button>
          {user && (
            <Link href={`/users/${user.id}`} aria-label="User Profile">
              <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-colors">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
