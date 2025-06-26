export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  personality: string;
  avatarUrl: string;
  ownerId: number;
}

export interface Post {
  id: number;
  petId: number;
  imageUrl: string;
  caption: string | null;
  likes: number;
  comments: number;
}

const users: User[] = [
  { id: 1, name: 'Malee', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 2, name: 'Somsak', avatarUrl: 'https://placehold.co/100x100.png' },
];

const pets: Pet[] = [
  {
    id: 1,
    name: 'Buppha',
    breed: 'Siamese Cat',
    age: 3,
    personality: 'A regal and affectionate cat who loves sunbathing and chasing laser pointers.',
    avatarUrl: 'https://placehold.co/400x400.png',
    ownerId: 1,
  },
  {
    id: 2,
    name: 'Chao',
    breed: 'Thai Ridgeback',
    age: 5,
    personality: 'Loyal and energetic, Chao enjoys long walks in the park and playing fetch.',
    avatarUrl: 'https://placehold.co/400x400.png',
    ownerId: 2,
  },
  {
    id: 3,
    name: 'Mali',
    breed: 'Golden Retriever',
    age: 2,
    personality: 'A friendly and playful pup who has never met a stranger.',
    avatarUrl: 'https://placehold.co/400x400.png',
    ownerId: 1,
  },
];

const posts: Post[] = [
  {
    id: 1,
    petId: 1,
    imageUrl: 'https://placehold.co/600x600.png',
    caption: 'Enjoying the afternoon sun. ☀️',
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    petId: 2,
    imageUrl: 'https://placehold.co/600x600.png',
    caption: 'Ready for our evening walk!',
    likes: 256,
    comments: 34,
  },
  {
    id: 3,
    petId: 3,
    imageUrl: 'https://placehold.co/600x600.png',
    caption: 'My favorite toy!',
    likes: 431,
    comments: 55,
  },
  {
    id: 4,
    petId: 1,
    imageUrl: 'https://placehold.co/600x600.png',
    caption: 'Napping is a serious business.',
    likes: 302,
    comments: 21,
  },
   {
    id: 5,
    petId: 2,
    imageUrl: 'https://placehold.co/600x600.png',
    caption: 'Met a new friend today!',
    likes: 189,
    comments: 17,
  },
];

export const getUsers = (): User[] => users;
export const getUserById = (id: number): User | undefined => users.find(u => u.id === id);

export const getPets = (): Pet[] => pets;
export const getPetById = (id: number): Pet | undefined => pets.find(p => p.id === id);
export const getPetsByOwnerId = (ownerId: number): Pet[] => pets.filter(p => p.ownerId === ownerId);

export const getPosts = (): Post[] => posts;
export const getPostById = (id: number): Post | undefined => posts.find(p => p.id === id);
export const getPostsByPetId = (petId: number): Post[] => posts.filter(p => p.petId === petId);
