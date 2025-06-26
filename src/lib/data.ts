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

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export interface Post {
  id: number;
  petId: number;
  media: Media[];
  caption: string | null;
  likes: number;
  comments: number;
}

export interface Expert {
  id: number;
  name: string;
  avatarUrl: string;
  specialty: string;
  bio: string;
  isAi: boolean;
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
    media: [
      { type: 'image', url: 'https://placehold.co/800x600.png' },
    ],
    caption: '<h2>Enjoying the afternoon sun. ☀️</h2><p>I love naps and this is my favorite spot. It gets the perfect amount of warmth without being too hot. My human sometimes joins me, but mostly it\'s just me and my thoughts.</p>',
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    petId: 2,
    media: [
      { type: 'image', url: 'https://placehold.co/400x300.png' },
      { type: 'image', url: 'https://placehold.co/400x300.png' },
    ],
    caption: '<h2>Ready for our evening walk!</h2><p>This is my favorite part of the day. We always go to the big park where I can see all my friends.</p>',
    likes: 256,
    comments: 34,
  },
  {
    id: 3,
    petId: 3,
    media: [
      { type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    ],
    caption: '<p>My favorite toy! I could chase this for hours. My human says I\'m obsessed, but I call it dedication. #doglife #playtime</p>',
    likes: 431,
    comments: 55,
  },
  {
    id: 4,
    petId: 1,
    media: [
      { type: 'image', url: 'https://placehold.co/400x300.png' },
      { type: 'image', url: 'https://placehold.co/400x300.png' },
      { type: 'image', url: 'https://placehold.co/400x300.png' },
      { type: 'image', url: 'https://placehold.co/400x300.png' },
    ],
    caption: '<h2>A collection of my best napping poses.</h2><p>Which one is your favorite? I\'m personally a fan of the "pretzel" and the "classic loaf".</p>',
    likes: 302,
    comments: 21,
  },
   {
    id: 5,
    petId: 2,
    media: [
      { type: 'image', url: 'https://placehold.co/600x400.png' },
      { type: 'image', url: 'https://placehold.co/300x400.png' },
      { type: 'image', url: 'https://placehold.co/300x400.png' },
    ],
    caption: '<p>Met a new friend today! We sniffed, we ran, we conquered the dog park. Can\'t wait for our next adventure.</p>',
    likes: 189,
    comments: 17,
  },
];

const experts: Expert[] = [
  {
    id: 1,
    name: 'Dr. Anya Sharma',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'Feline Veterinarian',
    bio: 'Specializing in cat health and wellness for over 10 years. Passionate about preventative care and nutrition.',
    isAi: false,
  },
  {
    id: 2,
    name: 'Dr. Ben Carter',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'Canine Behaviorist',
    bio: 'Certified behavior consultant helping dogs and their owners build stronger bonds through positive reinforcement training.',
    isAi: false,
  },
  {
    id: 100,
    name: 'PheuanPet AI Assistant',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'General Pet Care Advisor',
    bio: 'Your 24/7 AI-powered assistant for general pet care questions. For medical emergencies, please consult a veterinarian.',
    isAi: true,
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

export const getExperts = (): Expert[] => experts;
export const getExpertById = (id: number): Expert | undefined => experts.find(e => e.id === id);