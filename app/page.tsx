import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/data";

const Home = () => {
  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => <PostCard key={post.id} {...post} />)}
    </div>
  );
}

export default Home;