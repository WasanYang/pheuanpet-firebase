import { PawPrint, Home, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/data';

const Header = () => {
  const user = getUserById(1); // Mock logged-in user

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <PawPrint className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold hidden sm:inline-block">PheuanPet</span>
        </Link>
        
        <div className="flex-1">
          {/* Future search bar can go here */}
        </div>

        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Create Post">
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
