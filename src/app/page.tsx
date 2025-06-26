import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { getPosts, getUserById, getPetById } from '@/lib/data';

export default function Home() {
  const posts = getPosts();

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl py-8 px-4 animate-in fade-in duration-500">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
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
