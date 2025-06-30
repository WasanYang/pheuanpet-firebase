
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Bell,
  MessageCircle,
  Bookmark,
  PawPrint,
  Users,
  Settings,
  PlusCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { getPetsByOwnerId, getUserById } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';

const Sidebar = () => {
  const pathname = usePathname();
  const user = getUserById(1); // Mocked user
  const pets = user ? getPetsByOwnerId(user.id) : [];

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

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card h-screen sticky top-0">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="w-full justify-start h-10"
              asChild
            >
              <Link
                href={item.href}
                className="flex items-center gap-3"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
        
        <div className="px-4">
            <Separator className="my-2" />
        </div>

        <div className="px-4 py-2">
            <h2 className="px-3 text-sm font-semibold text-muted-foreground mb-2">Your Pets</h2>
            <div className="space-y-1">
            {pets.map(pet => (
                <Button key={pet.id} variant="ghost" className="w-full justify-start h-10" asChild>
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
    </aside>
  );
};

export default Sidebar;
