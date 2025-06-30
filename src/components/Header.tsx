'use client';

import { useState, useRef, useEffect } from 'react';
import { PawPrint, Home, PlusSquare, Search, Stethoscope, Menu, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useChat } from '@/context/ChatProvider';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const user = getUserById(1); // Mock logged-in user
  const { openChats } = useChat();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) {
      // Focus the input when the search bar becomes active.
      // A small timeout can help ensure the element is rendered and focusable.
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchActive]);

  const handleCancel = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (inputRef.current) {
        inputRef.current.value = '';
    }
    setIsSearchActive(false);
  };
  
  const handleBlur = () => {
    // We add a small delay because a click on the 'cancel' button's onMouseDown event
    // would trigger blur before the click is registered. This ensures we don't close prematurely.
     setTimeout(() => {
      // Check if another element has gained focus. If the body has focus, it means the user clicked outside.
      if (document.activeElement === document.body) {
        handleCancel();
      }
    }, 200);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container relative flex h-16 max-w-4xl items-center justify-between mx-auto px-4 overflow-hidden">
        
        {/* Logo and regular nav items */}
        <div className={cn(
          "flex items-center w-full transition-opacity duration-300",
          isSearchActive ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-4 flex-shrink-0">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold hidden sm:inline-block">PheuanPet</span>
          </Link>
          
          <div className="flex-1" /> {/* Spacer */}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 sm:space-x-4">
            {/* Desktop nav actions */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
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
            </div>
            
            {/* Universal Search Trigger */}
            <Button variant="ghost" size="icon" onClick={() => setIsSearchActive(true)}>
              <Search className="h-5 w-5" />
               <span className="sr-only">Open Search</span>
            </Button>

            {/* User profile avatar for Desktop */}
            {user && (
              <Link href={`/users/${user.id}`} aria-label="My Profile" className="hidden md:block">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-colors">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            )}

            {/* Hamburger Menu Trigger for mobile */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-foreground" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0 bg-card">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                      Main navigation menu for the PheuanPet application.
                    </SheetDescription>
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center gap-3">
                          <PawPrint className="h-8 w-8 text-primary" />
                          <span className="font-headline text-2xl font-bold">PheuanPet</span>
                      </Link>
                    </SheetClose>
                  </SheetHeader>
                  
                  <div className="p-4">
                    {user && (
                      <SheetClose asChild>
                        <Link href={`/users/${user.id}`} className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                          <Avatar className="h-8 w-8 border-2 border-primary">
                              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-bold">{user.name}</p>
                              <p className="text-xs text-muted-foreground">View Profile</p>
                          </div>
                        </Link>
                      </SheetClose>
                    )}
                  </div>

                  <Separator className="bg-border/50" />

                  <nav className="p-4 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/create" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                        <PlusSquare className="h-5 w-5 text-muted-foreground" />
                        <span>Create Post</span>
                      </Link>
                    </SheetClose>
                  </nav>

                  <Separator className="bg-border/50" />
                  <div className="p-4">
                    <SheetClose asChild>
                      <Link href="/login" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                        <LogIn className="h-5 w-5 text-muted-foreground" />
                        <span>Log In</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                        <UserPlus className="h-5 w-5 text-muted-foreground" />
                        <span>Sign Up</span>
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Bar and its wrapper (Overlay) */}
        <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out bg-card",
            isSearchActive 
              ? "z-10 opacity-100" 
              : "z-[-1] opacity-0 pointer-events-none"
        )}>
            <div className="w-full max-w-4xl flex items-center gap-2 px-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                      ref={inputRef}
                      type="search"
                      className="w-full pl-9"
                      onBlur={handleBlur}
                      placeholder="Search PheuanPet..."
                  />
                </div>
                {/* Use onMouseDown to prevent the input's onBlur from firing first and closing the search */}
                <button onMouseDown={handleCancel} className="text-sm text-primary font-medium">
                    Cancel
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;