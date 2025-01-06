import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/data";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4 p-4">
        {posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
}

export default Home;