'use client';

import { PawPrint, Home, PlusSquare, Search, Stethoscope, Menu, UserPlus, LogIn, Compass, Bell, MessageCircle, Bookmark, Users, Settings, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById, getPetsByOwnerId } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export default function Sidebar() {
  const user = getUserById(1);
  const pets = user ? getPetsByOwnerId(user.id) : [];
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/experts', label: 'Ask an Expert', icon: Stethoscope },
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/create', label: 'Create Post', icon: PlusSquare },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-4rem)] sticky top-16 border-r bg-card p-4">
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start h-10"
              asChild
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h2 className="px-2 text-sm font-semibold text-muted-foreground">Your Pets</h2>
          <div className="space-y-1">
            {pets.map(pet => (
              <Button variant="ghost" className="w-full justify-start h-10" asChild key={pet.id}>
                <Link href={`/pets/${pet.id}`} className="flex items-center gap-3">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                    <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{pet.name}</span>
                </Link>
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start h-10" asChild>
              <Link href="/create" className="flex items-center gap-3">
                <PlusCircle className="h-5 w-5" />
                <span className="font-medium">Add Pet</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {user && (
        <div className="mt-4">
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full justify-start h-10" asChild>
                <Link href={`/users/${user.id}`} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                </Link>
            </Button>
        </div>
      )}
    </aside>
  );
}
