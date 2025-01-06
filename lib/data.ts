import { PostProps, UserProps } from "./types";

export const users: UserProps[] = [
  {
    name: "Gaëtan",
    handle: "steellgold",
    avatar: "https://pbs.twimg.com/profile_images/1848354444225761280/hs-DRVoi_200x200.jpg",
    banner: "https://pbs.twimg.com/profile_banners/1197777735168483328/1723474739/600x200",
    bio: "🇫🇷 20. Indie Hacker | Full-stack developper",
    isVerified: true
  }
]

export const posts: PostProps[] = [
  {
    id: "72b9f8bc-2d74-4290-bcf1-f97815477a38",
    author: users[0],
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor non doloribus eligendi numquam asperiores fugit assumenda animi. Quo sint fugiat quaerat, voluptas aut, unde, dicta a recusandae nisi veniam quidem.',
    timestamp: '2m',
    replies: [],

    likes: 35,
    reposts: 12,

    isBookmarked: false,
    isLiked: false,
    isReposted: false,
  }
]