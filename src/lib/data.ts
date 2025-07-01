
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

export interface KnowledgeTip {
  id: number;
  title: string;
  content: string;
}

const users: User[] = [
  { id: 1, name: 'Malee', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Somsak', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'น.สพ.ญ. อัญญา ชาร์มา', avatarUrl: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'คุณเบน คาร์เตอร์', avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'น.สพ. โคลอี้ เดวิส', avatarUrl: 'https://images.unsplash.com/photo-1581093452445-0a75b39414ce?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'น.สพ. เคนจิ ทานากะ', avatarUrl: 'https://images.unsplash.com/photo-1534184241259-24be2a9d701d?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'น.สพ.ญ. อิซาเบลลา รอสซี', avatarUrl: 'https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=400&auto=format&fit=crop' },
];

const pets: Pet[] = [
  {
    id: 1,
    name: 'Buppha',
    breed: 'Siamese Cat',
    age: 3,
    personality: 'A regal and affectionate cat who loves sunbathing and chasing laser pointers.',
    avatarUrl: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=400&auto=format&fit=crop',
    ownerId: 1,
  },
  {
    id: 2,
    name: 'Chao',
    breed: 'Thai Ridgeback',
    age: 5,
    personality: 'Loyal and energetic, Chao enjoys long walks in the park and playing fetch.',
    avatarUrl: 'https://images.unsplash.com/photo-1519278297049-7c8a665259da?q=80&w=400&auto=format&fit=crop',
    ownerId: 2,
  },
  {
    id: 3,
    name: 'Mali',
    breed: 'Golden Retriever',
    age: 2,
    personality: 'A friendly and playful pup who has never met a stranger.',
    avatarUrl: 'https://images.unsplash.com/photo-1588022274482-13075591434b?q=80&w=400&auto=format&fit=crop',
    ownerId: 1,
  },
];

const posts: Post[] = [
  {
    id: 1,
    petId: 1,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1574158622682-e40e69841006?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: '<h2>Enjoying the afternoon sun. ☀️</h2><p>I love naps and this is my favorite spot. It gets the perfect amount of warmth without being too hot. My human sometimes joins me, but mostly it\'s just me and my thoughts.</p>',
    likes: 124,
    comments: 2,
  },
  {
    id: 2,
    petId: 2,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1605034313761-93a0c6347143?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: 'Ready for our evening walk!',
    likes: 256,
    comments: 1,
  },
  {
    id: 3,
    petId: 3,
    media: [
      { type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611250282006-44824e44f23e?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: '<p>My favorite toy! I could chase this for hours. My human says I\'m obsessed, but I call it dedication. #doglife #playtime</p>',
    likes: 431,
    comments: 1,
  },
  {
    id: 4,
    petId: 1,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1494256997604-768d1f6089b3?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516283024872-91c636155490?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: 'A collection of my best napping poses.',
    likes: 302,
    comments: 0,
  },
   {
    id: 5,
    petId: 2,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-15917682b4352-d61b7d598e8c?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: '<p>Met a new friend today! We sniffed, we ran, we conquered the dog park. Can\'t wait for our next adventure.</p>',
    likes: 189,
    comments: 0,
  },
  {
    id: 6,
    petId: 3,
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1590212151088-e9394a459253?q=80&w=800&auto=format&fit=crop' },
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
      { type: 'image', url: 'https://images.unsplash.com/photo-1513245543132-31f50741b26b?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: '<h1>My hunting skills are top-notch.</h1><p>This feather didn\'t stand a chance. It\'s important to stay sharp.</p>',
    likes: 215,
    comments: 1,
  },
  {
    id: 8,
    petId: 2,
    media: [
       { type: 'image', url: 'https://images.unsplash.com/photo-1541410921752-1b64e529a434?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: '<h2>Patiently waiting for dinner.</h2><p>I\'ve been a very good boy today. I think I deserve an extra treat, don\'t you?</p>',
    likes: 345,
    comments: 1,
  },
  {
    id: 9,
    petId: 3,
    media: [
       { type: 'image', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: 'Just a quick nap before dinner.',
    likes: 99,
    comments: 0,
  },
  {
    id: 10,
    petId: 3,
    media: [
       { type: 'image', url: 'https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=800&auto=format&fit=crop' },
    ],
    caption: 'Thinking about all the treats I am going to get today. Life is good.',
    likes: 150,
    comments: 0,
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
    avatarUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=400&auto=format&fit=crop',
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
    avatarUrl: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=400&auto=format&fit=crop',
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
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
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
    avatarUrl: 'https://images.unsplash.com/photo-1581093452445-0a75b39414ce?q=80&w=400&auto=format&fit=crop',
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
    avatarUrl: 'https://images.unsplash.com/photo-1534184241259-24be2a9d701d?q=80&w=400&auto=format&fit=crop',
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
    avatarUrl: 'https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=400&auto=format&fit=crop',
    specialty: 'ผู้เชี่ยวชาญการดูแลสัตว์เลี้ยงสูงวัย',
    bio: 'อุทิศตนเพื่อพัฒนาคุณภาพชีวิตของสัตว์เลี้ยงสูงวัยผ่านการจัดการความเจ็บปวดและการดูแลแบบประคับประคอง',
    description: 'ปรึกษาเรื่องการดูแลสัตว์เลี้ยงสูงวัย, โรคข้ออักเสบ, และการดูแลในช่วงท้ายของชีวิต',
    isAi: false,
    costPerMessage: 0,
  },
];

const trendingPetsData: Omit<Pet, 'age' | 'personality' | 'ownerId'>[] = [
    { id: 101, name: 'Charlie', breed: 'French Bulldog', avatarUrl: 'https://images.unsplash.com/photo-1588053612448-71343a411a7f?q=80&w=400&auto=format&fit=crop' },
    { id: 102, name: 'Bella', breed: 'Siamese Cat', avatarUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=400&auto=format&fit=crop' },
    { id: 103, name: 'Cooper', breed: 'Golden Retriever', avatarUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=400&auto=format&fit=crop' },
    { id: 104, name: 'Luna', breed: 'Maine Coon', avatarUrl: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?q=80&w=400&auto=format&fit=crop' },
];

const breedsData: Breed[] = [
    { name: 'Golden Retriever', imageUrl: 'https://images.unsplash.com/photo-1590212151088-e9394a459253?q=80&w=400&auto=format&fit=crop' },
    { name: 'Siamese Cat', imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=400&auto=format&fit=crop' },
    { name: 'French Bulldog', imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=400&auto=format&fit=crop' },
    { name: 'Thai Ridgeback', imageUrl: 'https://images.unsplash.com/photo-1605034313761-93a0c6347143?q=80&w=400&auto=format&fit=crop' },
    { name: 'Maine Coon', imageUrl: 'https://images.unsplash.com/photo-1598372620244-7764a7a85703?q=80&w=400&auto=format&fit=crop' },
    { name: 'Beagle', imageUrl: 'https://images.unsplash.com/photo-1517423440428-a5a003da8b33?q=80&w=400&auto=format&fit=crop' },
    { name: 'Persian Cat', imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=400&auto=format&fit=crop' },
    { name: 'Poodle', imageUrl: 'https://images.unsplash.com/photo-1587764379873-9781a9495979?q=80&w=400&auto=format&fit=crop' },
];

const knowledgeTips: KnowledgeTip[] = [
  {
    id: 1,
    title: 'Dental Health for Dogs',
    content: 'Did you know that regular brushing of your dog\'s teeth can prevent serious dental diseases? Vets recommend brushing 2-3 times a week with a toothpaste formulated for dogs. Human toothpaste can be toxic to them! Start slowly and make it a positive experience with lots of praise and treats. Healthy teeth lead to a healthier, happier dog overall.',
  },
  {
    id: 2,
    title: 'Understanding Cat Body Language',
    content: 'A cat\'s tail tells a story. A tail held high means they are confident and happy to see you. A twitching tail can indicate excitement or anxiety. A puffed-up tail is a clear sign of fear or aggression. Paying attention to these subtle cues can help you understand your feline friend much better and strengthen your bond.',
  },
  {
    id: 3,
    title: 'The Importance of Hydration',
    content: 'Proper hydration is crucial for all pets. It aids in digestion, nutrient absorption, and circulation. Always ensure fresh, clean water is available. For pets that don\'t drink much, consider a water fountain, as the moving water can be more appealing. Wet food is also a great way to increase water intake, especially for cats.',
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

export const getCommentsByPostId = (postId: number): Comment[] => comments.filter(c => c.postId === postId);

export const getExperts = (): Expert[] => experts;
export const getExpertById = (id: number): Expert | undefined => experts.find(e => e.id === id);
export const getExpertByUserId = (userId: number): Expert | undefined => experts.find(e => e.userId === userId);

export const getTrendingPets = (): Pet[] => trendingPetsData.map(p => ({...p, age: 3, personality: 'A very popular pet!', ownerId: 0}));

export const getBreeds = (): Breed[] => breedsData;

export const getKnowledgeTips = (): KnowledgeTip[] => knowledgeTips;

// Combined Feed Logic
export type FeedItem = 
  | { type: 'post'; data: { post: Post; pet: Pet; user: User } }
  | { type: 'knowledge'; data: KnowledgeTip }
  | { type: 'expert'; data: Expert };

export const getHomePageFeed = (): FeedItem[] => {
  const allPosts = getPosts().map(post => {
    const pet = getPetById(post.petId);
    const user = pet ? getUserById(pet.ownerId) : null;
    if (!pet || !user) return null;
    return { post, pet, user };
  }).filter(Boolean) as { post: Post; pet: Pet; user: User }[];

  const allExperts = getExperts().filter(e => !e.isAi);
  const allTips = getKnowledgeTips();

  const feed: FeedItem[] = [];

  // 1. Add a random knowledge tip at the top
  const randomTip = allTips[Math.floor(Math.random() * allTips.length)];
  if (randomTip) {
    feed.push({ type: 'knowledge', data: randomTip });
  }

  // 2. Add all posts, converting them to the FeedItem type
  allPosts.forEach(postData => {
    feed.push({ type: 'post', data: postData });
  });

  // 3. Insert a random expert spotlight after the 2nd post (at index 3)
  const randomExpert = allExperts[Math.floor(Math.random() * allExperts.length)];
  if (randomExpert && feed.length > 3) {
    feed.splice(3, 0, { type: 'expert', data: randomExpert });
  }

  return feed;
}
