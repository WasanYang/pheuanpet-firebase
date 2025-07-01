
'use client';

import { PawPrint, Home, Compass, Bell, MessageCircle, Bookmark, Users, Settings, PlusCircle } from 'lucide-react';
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
    { href: '/notifications', label: 'Notifications', icon: Bell },
    { href: '/messages', label: 'Messages', icon: MessageCircle },
    { href: '/saved', label: 'Saved', icon: Bookmark },
    { href: `/users/${user?.id}`, label: 'My Pets', icon: PawPrint },
    { href: '/explore?tab=vet-connect', label: 'Pet Friends', icon: Users },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start h-12 text-base"
              asChild
            >
              <Link href={item.href} className="flex items-center gap-4">
                <item.icon className="h-6 w-6" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="space-y-2">
          <h2 className="px-3 text-sm font-semibold text-muted-foreground tracking-wider uppercase">Your Pets</h2>
          <div className="space-y-1 mt-2">
            {pets.map(pet => (
              <Button variant="ghost" className="w-full justify-start h-12 text-base" asChild key={pet.id}>
                <Link href={`/pets/${pet.id}`} className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed} />
                    <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{pet.name}</span>
                </Link>
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start h-12 text-base" asChild>
              <Link href="/create" className="flex items-center gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <span className="font-medium">Add Pet</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
