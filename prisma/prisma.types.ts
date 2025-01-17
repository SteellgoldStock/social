// Base user type that's commonly reused
type UserBasicInfo = {
  name: string | null;
  username: string | null;
  image: string | null;
  isVerified: boolean;
};

// Parent post type with minimal info
type ParentPostInfo = {
  user: UserBasicInfo;
  content: string;
};

// Comment type that can contain nested comments
type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  mostRecent: Date;
  userId: string;
  parentId: string | null;
  likes: UserBasicInfo[];
  comments: CommentType[];
  parent: ParentPostInfo | null;
  user: UserBasicInfo;
};

// Main post type that matches the Prisma query response
type PostType = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  mostRecent: Date;
  userId: string;
  parentId: string | null;
  likes: UserBasicInfo[];
  comments: CommentType[];
  parent: ParentPostInfo | null;
  user: UserBasicInfo;
};

export type { UserBasicInfo, ParentPostInfo, CommentType, PostType };