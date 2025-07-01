import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pet, getTrendingPets } from "@/lib/data";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const TrendingPetItem = ({ pet }: { pet: Pet }) => (
  <div className="flex items-center justify-between gap-4">
    <Link href={`/pets/${pet.id}`} className="flex items-center gap-3 group flex-1 min-w-0">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={pet.avatarUrl} alt={pet.name} data-ai-hint={pet.breed.toLowerCase().replace(' ', '')} />
        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="font-semibold group-hover:underline truncate">{pet.name}</p>
        <p className="text-sm text-muted-foreground truncate">{pet.breed}</p>
      </div>
    </Link>
    <Button variant="outline" size="sm" className="flex-shrink-0 px-4">Follow</Button>
  </div>
);

export default function RightSidebar() {
  const trendingPets = getTrendingPets();

  return (
    <aside className="w-80 sticky top-20 h-fit">
        <div className="space-y-6">
            <Card>
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                        <TrendingUp className="h-5 w-5" />
                        Trending Pets
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                    {trendingPets.map(pet => (
                        <TrendingPetItem key={pet.id} pet={pet} />
                    ))}
                     <Button variant="link" className="w-full text-center justify-center text-muted-foreground">
                        <Link href="/explore">See more</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </aside>
  );
}
