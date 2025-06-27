'use client';

import { useState, useRef } from 'react';
import { PawPrint, Home, PlusSquare, Search, Stethoscope, Menu, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useChat } from '@/context/ChatProvider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const user = getUserById(1); // Mock logged-in user
  const { openChats } = useChat();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);


  // This should only trigger the expanding UI on mobile.
  const handleFocus = () => {
    if (isMobile) {
      setIsSearchActive(true);
    }
  };
  
  // This will only be called when the user clicks *outside* the input and cancel button.
  const handleBlur = () => {
    setIsSearchActive(false);
  };

  // Using onMouseDown and preventDefault to avoid a conflict with the input's onBlur event.
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputRef.current) {
        inputRef.current.value = '';
        // Manually trigger blur to hide the cancel button and collapse the search bar
        inputRef.current.blur();
    }
    setIsSearchActive(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container relative flex h-16 max-w-4xl items-center justify-between mx-auto px-4 overflow-hidden sm:overflow-visible">
        
        {/* Logo */}
        <div className={cn(
          "flex items-center space-x-2 mr-4 transition-all duration-300 ease-in-out",
          isSearchActive ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-100 translate-x-0"
        )}>
          {/* Logo for All Screens */}
          <Link href="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold hidden sm:inline-block">PheuanPet</span>
          </Link>
        </div>
        
        {/* Search Bar and its wrapper */}
        <div className={cn(
            "flex-1 flex justify-center items-center transition-all duration-300 ease-in-out",
            isSearchActive 
              ? "absolute inset-x-0" 
              : "relative sm:px-4 lg:px-8"
        )}>
            <div className={cn(
              "relative w-full max-w-md flex items-center gap-2",
              isSearchActive && "px-4"
            )}>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                      ref={inputRef}
                      type="search"
                      className="w-full pl-9"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder=""
                  />
                </div>
                {isSearchActive && (
                    <button onMouseDown={handleCancel} className="text-sm text-primary font-medium">
                        Cancel
                    </button>
                )}
            </div>
        </div>

        {/* Action Buttons */}
        <div className={cn(
            "flex items-center justify-end space-x-2 sm:space-x-4 ml-auto",
            isSearchActive ? "opacity-0 translate-x-full pointer-events-none" : "opacity-100 translate-x-0",
            "transition-all duration-300"
        )}>
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
          {/* User profile avatar for Desktop */}
          {user && (
            <Link href="/" aria-label="Home Page" className="hidden md:block">
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
                <SheetClose asChild>
                  <Link href="/" className="p-4 flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} data-ai-hint="person portrait" />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">Go to Homepage</p>
                    </div>
                  </Link>
                </SheetClose>
                
                <Separator className="bg-border/50" />

                <div className="p-4">
                  {user && (
                    <SheetClose asChild>
                      <Link href={`/users/${user.id}`} className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>View Profile</span>
                      </Link>
                    </SheetClose>
                  )}
                </div>

                <Separator className="bg-border/50" />

                <nav className="p-4 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                     <Link href="/experts" className="flex items-center justify-between rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                        <div className="flex items-center gap-3">
                            <Stethoscope className="h-5 w-5 text-muted-foreground" />
                            <span>Ask an Expert</span>
                        </div>
                        {openChats.length > 0 && (
                          <div className="flex h-2.5 w-2.5">
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
                          </div>
                        )}
                    </Link>
                  </SheetClose>
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
    </header>
  );
};

export default Header;
