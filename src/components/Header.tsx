
'use client';

import { useState, useRef, useEffect } from 'react';
import { PawPrint, Home, PlusSquare, Search, Stethoscope, Menu, UserPlus, LogIn, Clock, X, Compass, Bell, MessageCircle, Bookmark, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useChat } from '@/context/ChatProvider';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';

const Header = () => {
  const user = getUserById(1); // Mock logged-in user
  const { openChats } = useChat();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: '/my-pets', label: 'My Pets', icon: PawPrint },
    { href: '/friends', label: 'Pet Friends', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    if (isSearchActive) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchActive]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('pheuanpet_search_history');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const performSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      const newHistory = [trimmedQuery, ...searchHistory.filter(item => item !== trimmedQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('pheuanpet_search_history', JSON.stringify(newHistory));
      // In a real app, you would navigate to the search results page, e.g., router.push(`/search?q=${trimmedQuery}`)
      console.log(`Searching for: ${trimmedQuery}`);
      setIsSearchActive(false);
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const removeHistoryItem = (e: React.MouseEvent, itemToRemove: string) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(item => item !== itemToRemove);
    setSearchHistory(newHistory);
    localStorage.setItem('pheuanpet_search_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('pheuanpet_search_history');
  };

  const handleCancel = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsSearchActive(false);
    setSearchQuery('');
  };

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 max-w-6xl items-center justify-between mx-auto px-4">
          
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 mr-2 md:hidden">
              <PawPrint className="h-8 w-8 text-primary" />
            </Link>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-muted rounded-full" onClick={() => setIsSearchActive(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Open Search</span>
            </Button>
          </div>

          {/* Center Section - Desktop Nav (Removed for sidebar) */}
          
          {/* Right Section */}
          <div className="flex items-center justify-end gap-2">
            {user ? (
              <Link href={`/users/${user.id}`} aria-label="My Profile">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-colors">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button asChild><Link href="/login">Log In</Link></Button>
            )}

            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-foreground" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0 bg-card border-none">
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
                  
                  {user && (
                    <div className="p-4">
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
                    </div>
                  )}

                  <Separator className="bg-border/50" />

                  <nav className="p-4 flex flex-col gap-2">
                    {menuItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-md p-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <Separator className="bg-border/50" />

                  {!user && (
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
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {isSearchActive && (
        <div className="fixed inset-0 z-50 bg-background animate-in fade-in duration-200">
          <div className="container max-w-4xl mx-auto px-4 h-full flex flex-col">
            <div className="flex items-center h-16 gap-2 border-b">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={inputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9"
                  placeholder="Search PheuanPet..."
                />
              </form>
              <button onClick={handleCancel} className="text-sm text-primary font-medium shrink-0">
                Cancel
              </button>
            </div>
            
            <div className="py-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-base">Recent</h3>
                  {searchHistory.length > 0 && (
                    <Button variant="link" size="sm" className="text-primary p-0 h-auto" onClick={clearHistory}>
                      Clear
                    </Button>
                  )}
              </div>
              {searchHistory.length > 0 ? (
                <ul className="space-y-1">
                  {searchHistory.map((item, index) => (
                    <li key={index} className="flex items-center justify-between group rounded-md hover:bg-muted">
                      <button className="flex items-center gap-4 py-2 px-2 w-full text-left" onClick={() => handleHistoryClick(item)}>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="flex-1">{item}</span>
                      </button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 mr-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => removeHistoryItem(e, item)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No recent searches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default Header;
