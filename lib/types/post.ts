export type PostProps = {
  id: string;

  author: UserProps;

  timestamp: string;
  content: string;
  replies: PostProps[];
  reposts: number; // TODO: Should be a array of user ids with post id 
  likes: number; // TODO: Should be a array of user ids with post id

  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}

export type UserProps = {
  name: string;
  handle: string;

  avatar: string;
  banner: string;
  bio: string;

  isVerified: boolean;
}