'use client';

import { useState, useRef } from 'react';
import { PawPrint, Home, PlusSquare, Search, Stethoscope, Menu } from 'lucide-react';
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
  
  // A small delay allows clicking the cancel button before the UI collapses
  const handleBlur = () => {
    setTimeout(() => {
        setIsSearchActive(false);
    }, 200);
  };

  const handleCancel = () => {
    // We manually blur the input, which will trigger handleBlur and collapse the UI.
    if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.blur();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container relative flex h-16 max-w-4xl items-center mx-auto px-4 overflow-hidden sm:overflow-visible">
        
        {/* Logo and Mobile Menu */}
        <div className={cn(
          "flex items-center space-x-2 mr-4 transition-all duration-300 ease-in-out",
          isSearchActive ? "-translate-x-[200%]" : "translate-x-0"
        )}>
           {/* Hamburger Menu Trigger for mobile */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-4">
                <div className="mb-6">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <PawPrint className="h-8 w-8 text-primary" />
                        <span className="font-headline text-2xl font-bold">PheuanPet</span>
                    </Link>
                </div>
                <Separator className="bg-border" />
                <nav className="mt-6 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                     <Link href="/experts" className="flex items-center justify-between rounded-md p-3 text-base font-medium hover:bg-accent">
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
                    <Link href="/create" className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent">
                      <PlusSquare className="h-5 w-5 text-muted-foreground" />
                      <span>Create Post</span>
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo for Desktop */}
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold hidden sm:inline-block">PheuanPet</span>
          </Link>
        </div>
        
        {/* Search Bar and its wrapper */}
        <div className={cn(
            "flex-1 flex justify-center items-center transition-all duration-300 ease-in-out",
            isSearchActive 
              ? "absolute inset-x-0 px-4" 
              : "relative sm:px-4 lg:px-8"
        )}>
            <div className="relative w-full max-w-md flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                      ref={inputRef}
                      type="search"
                      className="w-full pl-9"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                  />
                </div>
                {isSearchActive && (
                    <button onClick={handleCancel} className="text-sm text-primary font-medium">
                        Cancel
                    </button>
                )}
            </div>
        </div>

        {/* Action Buttons */}
        <div className={cn(
            "flex items-center justify-end space-x-2 sm:space-x-4 transition-all duration-300 ease-in-out",
            isSearchActive ? "translate-x-[200%]" : "translate-x-0"
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
          {/* User profile avatar */}
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
