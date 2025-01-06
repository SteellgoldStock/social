import { PostCard } from "@/components/post-card";
import { users } from "@/lib/data";
import { PostProps } from "@/lib/types";

const posts: PostProps[] = [
  {
    id: "72b9f8bc-2d74-4290-bcf1-f97815477a38",
    author: users[0],
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor non doloribus eligendi numquam asperiores fugit assumenda animi. Quo sint fugiat quaerat, voluptas aut, unde, dicta a recusandae nisi veniam quidem.",
    timestamp: "2m",
    replies: [],

    likes: 35,
    reposts: 12,

    isBookmarked: false,
    isLiked: false,
    isReposted: false,
  }
]

const Home = () => {
  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => <PostCard key={post.id} {...post} />)}
    </div>
  );
}

export default Home;