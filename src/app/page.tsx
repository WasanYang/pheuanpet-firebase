'use client';

import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { getPosts, getUserById, getPetById } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ColorPalette = () => {
  const colors = [
    { name: 'Vibrant Gold', role: 'Primary', class: 'bg-primary', hsl: '45 95% 51%' },
    { name: 'Muted Orange', role: 'Accent', class: 'bg-accent', hsl: '25 76% 47%' },
    { name: 'Soft Beige', role: 'Background', class: 'bg-background border', hsl: '60 56% 93%' },
    { name: 'Dark Brown', role: 'Foreground', class: 'bg-foreground', hsl: '20 14% 4%' },
  ];

  return (
    <Card className="my-8 bg-card/80 shadow-lg border-none rounded-none sm:rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="font-headline text-2xl">ชุดสีของแอปพลิเคชัน</CardTitle>
        <CardDescription>นี่คือสีหลักที่สร้างบรรยากาศและความรู้สึกให้กับแอปของเราครับ</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
        {colors.map(color => (
          <div key={color.name} className="flex items-center gap-4">
            <div className={`h-16 w-16 rounded-lg flex-shrink-0 ${color.class}`}></div>
            <div>
                <h3 className="font-bold text-lg">{color.name}</h3>
                <p className="font-semibold text-primary">{color.role}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">hsl({color.hsl})</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


export default function Home() {
  const posts = getPosts();

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="max-w-2xl mx-auto py-2 px-0 sm:px-2 animate-in fade-in duration-500">
        <ColorPalette />
        <div className="flex flex-col">
          {posts.map(post => {
            const pet = getPetById(post.petId);
            const user = pet ? getUserById(pet.ownerId) : null;
            if (!pet || !user) return null;
            return <PostCard key={post.id} post={post} pet={pet} user={user} />;
          })}
        </div>
      </main>
    </div>
  );
}
