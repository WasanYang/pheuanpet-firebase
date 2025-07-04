
'use client';

import { PawPrint, Home, Menu, Compass, Bell, MessageCircle, Bookmark, Users, Settings, PlusCircle, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById, getPetsByOwnerId } from '@/lib/data';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';

const Header = () => {
  const user = getUserById(1);
  const pets = user ? getPetsByOwnerId(user.id) : [];
  const pathname = usePathname();
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: `/users/${user?.id}`, label: 'My Pets', icon: PawPrint },
    { href: '/explore?tab=vet-connect', label: 'Pet Friends', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const desktopIcons = (
    <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" size="icon" className="md:inline-flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
        {user && (
            <Button variant="ghost" className="p-1 h-auto md:inline-flex" asChild>
                <Link href={`/users/${user?.id}`}>
                    <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
            </Button>
        )}
    </div>
  );

  const mobileMenuSheet = (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 bg-card border-l w-3/4">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation</SheetDescription>
              <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3">
                      <PawPrint className="h-8 w-8 text-primary" />
                      <span className="font-headline text-2xl font-bold">PheuanPet</span>
                  </Link>
              </SheetClose>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                {menuItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                        <Button
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start h-12 text-base"
                        asChild
                        >
                        <Link href={item.href} className="flex items-center gap-4">
                            <item.icon className="h-6 w-6" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                        </Button>
                    </SheetClose>
                ))}
                </div>

                <Separator className="my-4" />

                <div className="px-4 space-y-2">
                <h2 className="px-3 text-sm font-semibold text-muted-foreground tracking-wider uppercase">Your Pets</h2>
                <div className="space-y-1">
                    {pets.map(pet => (
                    <SheetClose asChild key={pet.id}>
                        <Button variant="ghost" className="w-full justify-start h-12 text-base" asChild>
                        <Link href={`/pets/${pet.id}`} className="flex items-center gap-4">
                            <Avatar className="h-8 w-8">
                            <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                            <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{pet.name}</span>
                        </Link>
                        </Button>
                    </SheetClose>
                    ))}
                    <SheetClose asChild>
                        <Button variant="ghost" className="w-full justify-start h-12 text-base" asChild>
                            <Link href="/create" className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                                <PlusCircle className="h-6 w-6" />
                                </div>
                                <span className="font-medium">Add Pet</span>
                            </Link>
                        </Button>
                    </SheetClose>
                </div>
                </div>
            </div>
        </SheetContent>
      </Sheet>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="container max-w-screen-2xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-3">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">PheuanPet</span>
          </Link>
          <div className="flex items-center gap-1">
            {mobileMenuSheet}
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex h-16 items-center justify-center gap-x-6">
          
          {/* Left Aligner - Mirrors left sidebar */}
          <div className="w-48 flex-shrink-0">
            <div className="px-4">
              <Link href="/" className="flex items-center space-x-3">
                <PawPrint className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">PheuanPet</span>
              </Link>
            </div>
          </div>
          
          {/* Middle Content Aligner - Mirrors main content */}
          <div className="w-full max-w-[600px]">
             {/* Icons for Medium Screens (when right sidebar is hidden) */}
             <div className="flex w-full justify-end items-center px-4 xl:hidden">
              {desktopIcons}
            </div>
          </div>

          {/* Right Aligner - Mirrors right sidebar */}
          <div className="w-80 flex-shrink-0 hidden xl:flex">
             <div className="w-full flex justify-end items-center px-4">
                {desktopIcons}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
