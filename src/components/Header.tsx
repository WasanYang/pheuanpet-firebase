
'use client';

import { PawPrint, Home, Menu, Compass, Bell, MessageCircle, Bookmark, Users, Settings, PlusCircle, Sun } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById, getPetsByOwnerId } from '@/lib/data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const user = getUserById(1);
  const pets = user ? getPetsByOwnerId(user.id) : [];
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: `/users/${user?.id}`, label: 'My Pets', icon: PawPrint },
    { href: '/experts', label: 'Pet Friends', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="container max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-card border-r">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Main navigation menu for the PheuanPet application.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4 border-b">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-3">
                            <PawPrint className="h-8 w-8 text-primary" />
                            <span className="font-headline text-2xl font-bold">PheuanPet</span>
                        </Link>
                    </SheetClose>
                </div>
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

          <Link href="/" className="flex items-center space-x-3">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="hidden sm:block font-headline text-2xl font-bold">PheuanPet</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
            </Button>
            {user && (
                <Button variant="ghost" className="p-1 h-auto" asChild>
                    <Link href={`/users/${user.id}`}>
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                </Button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
