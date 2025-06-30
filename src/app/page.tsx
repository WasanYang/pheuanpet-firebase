'use client';

import PostCard from '@/components/PostCard';
import { getPosts, getUserById, getPetById } from '@/lib/data';

export default function Home() {
  const posts = getPosts();

  return (
      <main className="w-full animate-in fade-in duration-500">
        <div className="flex flex-col gap-6">
          {posts.map(post => {
            const pet = getPetById(post.petId);
            const user = pet ? getUserById(pet.ownerId) : null;
            if (!pet || !user) return null;
            return <PostCard key={post.id} post={post} pet={pet} user={user} />;
          })}
        </div>
      </main>
  );
}
