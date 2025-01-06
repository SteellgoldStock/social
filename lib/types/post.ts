export type PostProps = {
  id: string;

  author: {
    name: string;
    handle: string;
    avatar: string;
  }

  timestamp: string;
  content: string;
  replies: PostProps[];
  reposts: number; // TODO: Should be a array of user ids with post id 
  likes: number; // TODO: Should be a array of user ids with post id

  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}