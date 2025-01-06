import { PostProps, UserProps } from "./types";

export const users: UserProps[] = [
  {
    name: "Thomas Dupont",
    handle: "tdupont",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Développeur fullstack passionné | React & Node.js",
    isVerified: false
  },
  {
    name: "Marie Laurent",
    handle: "mlaurent",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Architecte logiciel | Tech lead",
    isVerified: false
  },
  {
    name: "Lucas Bernard",
    handle: "lbernard",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Amateur de café & code | Frontend specialist",
    isVerified: false
  },
  {
    name: "Sophie Martin",
    handle: "smartin",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "UX Designer | Design systems enthusiast",
    isVerified: false
  },
  {
    name: "Pierre Dubois",
    handle: "pdubois",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "DevOps & Cloud architect | AWS certified",
    isVerified: false
  },
  {
    name: "Claire Petit",
    handle: "cpetit",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Data scientist | ML engineer",
    isVerified: false
  },
  {
    name: "Antoine Moreau",
    handle: "amoreau",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Mobile dev | Flutter & React Native",
    isVerified: false
  },
  {
    name: "Emma Leroy",
    handle: "eleroy",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Cybersécurité | Pentester",
    isVerified: false
  },
  {
    name: "Hugo Richard",
    handle: "hrichard",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Game developer | Unity 3D",
    isVerified: false
  },
  {
    name: "Julie Roux",
    handle: "jroux",
    avatar: "/api/placeholder/150/150",
    banner: "/api/placeholder/1500/500",
    bio: "Product Manager | Agile coach",
    isVerified: false
  }
];

export const posts: PostProps[] = [
  {
    id: "1",
    author: users[0],
    timestamp: "2024-01-06T09:00:00Z",
    content: "Je viens de découvrir Astro.js, c'est vraiment impressionnant pour le SSG ! Qui l'a déjà testé ?",
    replies: [],
    reposts: 12,
    likes: 45,
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: "2",
    author: users[0],
    timestamp: "2024-01-06T10:15:00Z",
    content: "Premier meetup de l'année ce soir sur TypeScript 5.0 ! Qui sera là ? 🚀",
    replies: [],
    reposts: 8,
    likes: 32,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "3",
    author: users[1],
    timestamp: "2024-01-06T08:30:00Z",
    content: "Nouvelle année, nouveau projet ! On migre toute notre stack vers le serverless. Des conseils ?",
    replies: [],
    reposts: 15,
    likes: 67,
    isLiked: false,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "4",
    author: users[1],
    timestamp: "2024-01-06T11:45:00Z",
    content: "Article intéressant sur les microservices vs monolithe. Le débat est toujours d'actualité en 2024 !",
    replies: [],
    reposts: 25,
    likes: 89,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "5",
    author: users[2],
    timestamp: "2024-01-06T07:20:00Z",
    content: "Je cherche des retours sur Remix. Quelqu'un l'utilise en prod ?",
    replies: [],
    reposts: 5,
    likes: 18,
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: "6",
    author: users[2],
    timestamp: "2024-01-06T12:00:00Z",
    content: "VSCode ou WebStorm ? Le débat éternel continue...",
    replies: [],
    reposts: 30,
    likes: 150,
    isLiked: true,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "7",
    author: users[3],
    timestamp: "2024-01-06T09:45:00Z",
    content: "Je viens de publier un nouveau design system open source ! Lien dans ma bio 🎨",
    replies: [],
    reposts: 42,
    likes: 156,
    isLiked: false,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "8",
    author: users[3],
    timestamp: "2024-01-06T13:15:00Z",
    content: "Les tendances UX pour 2024 : moins de dark patterns, plus d'accessibilité !",
    replies: [],
    reposts: 38,
    likes: 201,
    isLiked: true,
    isReposted: true,
    isBookmarked: true
  },
  {
    id: "9",
    author: users[4],
    timestamp: "2024-01-06T10:30:00Z",
    content: "Docker Desktop devient payant pour les grandes entreprises. Alternatives ?",
    replies: [],
    reposts: 62,
    likes: 245,
    isLiked: false,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "10",
    author: users[4],
    timestamp: "2024-01-06T14:00:00Z",
    content: "Kubernetes ou ECS ? Notre retour d'expérience après 1 an...",
    replies: [],
    reposts: 85,
    likes: 320,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "11",
    author: users[5],
    timestamp: "2024-01-06T08:00:00Z",
    content: "Python 3.12 est sorti ! Les nouvelles features sont impressionnantes 🐍",
    replies: [],
    reposts: 92,
    likes: 434,
    isLiked: false,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "12",
    author: users[5],
    timestamp: "2024-01-06T11:30:00Z",
    content: "Qui utilise déjà GPT-4 en prod ? Retours ?",
    replies: [],
    reposts: 73,
    likes: 289,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "13",
    author: users[6],
    timestamp: "2024-01-06T09:15:00Z",
    content: "Flutter 4.0 arrive bientôt ! Les performances s'annoncent dingues 📱",
    replies: [],
    reposts: 45,
    likes: 167,
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: "14",
    author: users[6],
    timestamp: "2024-01-06T12:45:00Z",
    content: "React Native Web vs Flutter Web : mon analyse comparative",
    replies: [],
    reposts: 38,
    likes: 142,
    isLiked: true,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "15",
    author: users[7],
    timestamp: "2024-01-06T07:45:00Z",
    content: "Nouvelle faille critique découverte dans Log4j ! Mettez à jour ASAP 🚨",
    replies: [],
    reposts: 156,
    likes: 523,
    isLiked: false,
    isReposted: true,
    isBookmarked: true
  },
  {
    id: "16",
    author: users[7],
    timestamp: "2024-01-06T13:30:00Z",
    content: "Workshop cybersécurité la semaine prochaine ! Places limitées ⚡",
    replies: [],
    reposts: 29,
    likes: 98,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  },
  {
    id: "17",
    author: users[8],
    timestamp: "2024-01-06T10:00:00Z",
    content: "Unreal Engine 5.1 est juste incroyable pour le jeu vidéo ! 🎮",
    replies: [],
    reposts: 82,
    likes: 345,
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: "18",
    author: users[8],
    timestamp: "2024-01-06T14:15:00Z",
    content: "Je recrute un dev Unity senior pour un projet de métaverse !",
    replies: [],
    reposts: 42,
    likes: 127,
    isLiked: true,
    isReposted: true,
    isBookmarked: false
  },
  {
    id: "19",
    author: users[9],
    timestamp: "2024-01-06T08:45:00Z",
    content: "Les NFTs sont-ils vraiment morts en 2024 ? Mon analyse...",
    replies: [],
    reposts: 95,
    likes: 412,
    isLiked: false,
    isReposted: true,
    isBookmarked: true
  },
  {
    id: "20",
    author: users[9],
    timestamp: "2024-01-06T11:15:00Z",
    content: "Comment on a réduit notre time-to-market de 50% avec le NoCode",
    replies: [],
    reposts: 67,
    likes: 234,
    isLiked: true,
    isReposted: false,
    isBookmarked: true
  }
];

export const findPost = (id: string, posts: PostProps[]): PostProps | undefined => {
  for (const post of posts) {
    if (post.id === id) return post;
    const foundInReplies = findPost(id, post.replies);
    if (foundInReplies) return foundInReplies;
  }
  return undefined;
};