'use client';

import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { getPosts, getUserById, getPetById } from '@/lib/data';

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-4 animate-in fade-in duration-500">
        <div className="flex flex-col gap-4">
          {posts.map(post => {
            const pet = getPetById(post.petId);
            const user = pet ? getUserById(pet.ownerId) : null;
            if (!pet || !user) return null;
            return <PostCard key={post.id} post={post} pet={pet} user={user} />;
          })}
        </div>
      </main>
    </>
  );
}
