
export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Pet {
  id: number;
  name:string;
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

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  timestamp: string;
}

export interface Expert {
  id: number;
  userId: number;
  name: string;
  avatarUrl: string;
  specialty: string;
  bio: string;
  description: string;
  isAi: boolean;
  costPerMessage: number;
}

export interface Breed {
    name: string;
    imageUrl: string;
}

const users: User[] = [
  { id: 1, name: 'Malee', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 2, name: 'Somsak', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 3, name: 'น.สพ.ญ. อัญญา ชาร์มา', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 4, name: 'คุณเบน คาร์เตอร์', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 5, name: 'น.สพ. โคลอี้ เดวิส', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 6, name: 'น.สพ. เคนจิ ทานากะ', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 7, name: 'น.สพ.ญ. อิซาเบลลา รอสซี', avatarUrl: 'https://placehold.co/100x100.png' },
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
    comments: 2,
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
    comments: 1,
  },
  {
    id: 3,
    petId: 3,
    media: [
      { type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
      { type: 'image', url: 'https://placehold.co/800x600.png' },
    ],
    caption: '<p>My favorite toy! I could chase this for hours. My human says I\'m obsessed, but I call it dedication. #doglife #playtime</p>',
    likes: 431,
    comments: 1,
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
    comments: 0,
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
    comments: 0,
  },
  {
    id: 6,
    petId: 3,
    media: [
      { type: 'image', url: 'https://placehold.co/800x600.png' },
    ],
    caption: '<h3>Just got back from the groomer!</h3><p>Feeling fresh and fabulous. Look at this shiny coat!</p>',
    likes: 512,
    comments: 1,
  },
  {
    id: 7,
    petId: 1,
    media: [
      { type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
      { type: 'image', url: 'https://placehold.co/800x600.png' },
    ],
    caption: '<h1>My hunting skills are top-notch.</h1><p>This feather didn\'t stand a chance. It\'s important to stay sharp.</p>',
    likes: 215,
    comments: 1,
  },
  {
    id: 8,
    petId: 2,
    media: [
       { type: 'image', url: 'https://placehold.co/600x800.png' },
    ],
    caption: '<h2>Patiently waiting for dinner.</h2><p>I\'ve been a very good boy today. I think I deserve an extra treat, don\'t you?</p>',
    likes: 345,
    comments: 1,
  },
];

const comments: Comment[] = [
  { id: 1, postId: 1, userId: 2, content: 'What a beautiful cat! So majestic.', timestamp: '2 hours ago' },
  { id: 2, postId: 1, userId: 1, content: 'Thank you! She loves the camera.', timestamp: '1 hour ago' },
  { id: 3, postId: 2, userId: 1, content: 'Such a happy dog!', timestamp: '5 hours ago' },
  { id: 4, postId: 3, userId: 2, content: 'So much energy! I love it!', timestamp: '1 day ago' },
  { id: 5, postId: 2, userId: 2, content: 'Looks like he is having a great time!', timestamp: '3 hours ago' },
  { id: 6, postId: 3, userId: 1, content: 'She could play with that all day long!', timestamp: '22 hours ago' },
  { id: 7, postId: 5, userId: 1, content: 'New friends are the best!', timestamp: '3 days ago' },
  { id: 8, postId: 5, userId: 2, content: 'Hope they meet again soon!', timestamp: '3 days ago' },
  { id: 9, postId: 6, userId: 1, content: 'So fluffy! ❤️', timestamp: '1 hour ago' },
  { id: 10, postId: 7, userId: 2, content: 'Fierce hunter!', timestamp: '3 hours ago' },
  { id: 11, postId: 8, userId: 1, content: 'Of course you do! Good boy!', timestamp: '30 minutes ago' },
];


const experts: Expert[] = [
  {
    id: 100,
    userId: -1,
    name: 'AI สัตวแพทย์ผู้ช่วย',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'คำปรึกษาทั่วไป 24 ชม.',
    bio: 'ผู้ช่วย AI ของคุณสำหรับคำถามการดูแลสัตว์เลี้ยงทั่วไป สำหรับเหตุฉุกเฉินทางการแพทย์โปรดปรึกษาสัตวแพทย์',
    description: 'รับคำตอบสำหรับคำถามทั่วไปเกี่ยวกับสุขภาพ, โภชนาการ, และพฤติกรรมของสัตว์เลี้ยงได้ทันที',
    isAi: true,
    costPerMessage: 1,
  },
  {
    id: 1,
    userId: 3,
    name: 'น.สพ.ญ. อัญญา ชาร์มา',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'คลินิกแมวเฉพาะทาง',
    bio: 'เชี่ยวชาญด้านสุขภาพและสุขภาวะของแมวมานานกว่า 10 ปี หลงใหลในการดูแลป้องกันและโภชนาการ',
    description: 'ปรึกษาปัญหาเฉพาะทางสำหรับแมว ตั้งแต่โรคทั่วไปจนถึงการดูแลที่ซับซ้อน',
    isAi: false,
    costPerMessage: 0, // For future use
  },
  {
    id: 2,
    userId: 4,
    name: 'คุณเบน คาร์เตอร์',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'ผู้เชี่ยวชาญพฤติกรรมสุนัข',
    bio: 'ที่ปรึกษาด้านพฤติกรรมที่ได้รับการรับรอง ช่วยให้สุนัขและเจ้าของสร้างความสัมพันธ์ที่แน่นแฟ้นยิ่งขึ้น',
    description: 'แก้ปัญหาพฤติกรรมสุนัข เช่น ความก้าวร้าว, ความวิตกกังวล, และการฝึกเข้าสังคม',
    isAi: false,
    costPerMessage: 0, // For future use
  },
  {
    id: 3,
    userId: 5,
    name: 'น.สพ. โคลอี้ เดวิส',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'ผู้เชี่ยวชาญสัตว์เลี้ยงชนิดพิเศษ',
    bio: 'สัตวแพทย์ผู้มีประสบการณ์ในการรักษาสัตว์เลื้อยคลาน นก และสัตว์เลี้ยงลูกด้วยนมขนาดเล็ก',
    description: 'ให้คำปรึกษาการดูแล, โภชนาการ, และการป้องกันโรคสำหรับสัตว์เลี้ยงชนิดพิเศษ',
    isAi: false,
    costPerMessage: 0,
  },
  {
    id: 4,
    userId: 6,
    name: 'น.สพ. เคนจิ ทานากะ',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'นักโภชนาการสัตวแพทย์',
    bio: 'เชี่ยวชาญในการวางแผนอาหารที่เหมาะกับความต้องการของสัตว์เลี้ยงแต่ละตัว โดยเฉพาะสัตว์เลี้ยงที่มีภาวะป่วย',
    description: 'วางแผนโภชนาการเพื่อจัดการน้ำหนัก, ภูมิแพ้, และภาวะสุขภาพอื่นๆ',
    isAi: false,
    costPerMessage: 0,
  },
  {
    id: 5,
    userId: 7,
    name: 'น.สพ.ญ. อิซาเบลลา รอสซี',
    avatarUrl: 'https://placehold.co/100x100.png',
    specialty: 'ผู้เชี่ยวชาญการดูแลสัตว์เลี้ยงสูงวัย',
    bio: 'อุทิศตนเพื่อพัฒนาคุณภาพชีวิตของสัตว์เลี้ยงสูงวัยผ่านการจัดการความเจ็บปวดและการดูแลแบบประคับประคอง',
    description: 'ปรึกษาเรื่องการดูแลสัตว์เลี้ยงสูงวัย, โรคข้ออักเสบ, และการดูแลในช่วงท้ายของชีวิต',
    isAi: false,
    costPerMessage: 0,
  },
];

const trendingPetsData: Omit<Pet, 'age' | 'personality' | 'ownerId'>[] = [
    { id: 101, name: 'Charlie', breed: 'French Bulldog', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 102, name: 'Bella', breed: 'Siamese Cat', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 103, name: 'Cooper', breed: 'Golden Retriever', avatarUrl: 'https://placehold.co/100x100.png' },
    { id: 104, name: 'Luna', breed: 'Maine Coon', avatarUrl: 'https://placehold.co/100x100.png' },
];

const breedsData: Breed[] = [
    { name: 'Golden Retriever', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Siamese Cat', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'French Bulldog', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Thai Ridgeback', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Maine Coon', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Beagle', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Persian Cat', imageUrl: 'https://placehold.co/200x200.png' },
    { name: 'Poodle', imageUrl: 'https://placehold.co/200x200.png' },
];

export const getUsers = (): User[] => users;
export const getUserById = (id: number): User | undefined => users.find(u => u.id === id);

export const getPets = (): Pet[] => pets;
export const getPetById = (id: number): Pet | undefined => pets.find(p => p.id === id);
export const getPetsByOwnerId = (ownerId: number): Pet[] => pets.filter(p => p.ownerId === ownerId);

export const getPosts = (): Post[] => posts;
export const getPostById = (id: number): Post | undefined => posts.find(p => p.id === id);
export const getPostsByPetId = (petId: number): Post[] => posts.filter(p => p.petId === petId);

export const getCommentsByPostId = (postId: number): Comment[] => comments.filter(c => c.postId === postId);

export const getExperts = (): Expert[] => experts;
export const getExpertById = (id: number): Expert | undefined => experts.find(e => e.id === id);
export const getExpertByUserId = (userId: number): Expert | undefined => experts.find(e => e.userId === userId);

export const getTrendingPets = (): Pet[] => trendingPetsData.map(p => ({...p, age: 3, personality: 'A very popular pet!', ownerId: 0}));

export const getBreeds = (): Breed[] => breedsData;
