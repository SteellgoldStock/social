import { PostCard } from "@/components/post-card";
import { PostProps } from "@/lib/types";

const tweets: PostProps[] = [
  {
    id: "72b9f8bc-2d74-4290-bcf1-f97815477a38",
    author: { name: 'John Doe', handle: '@johndoe', avatar: '/avatars/john-doe.jpg', isVerified: false },
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor non doloribus eligendi numquam asperiores fugit assumenda animi. Quo sint fugiat quaerat, voluptas aut, unde, dicta a recusandae nisi veniam quidem.',
    timestamp: '2m',
    replies: [],

    likes: 35,
    reposts: 12,

    isBookmarked: false,
    isLiked: false,
    isReposted: false,
  },
  {
    id: "2db6e666-a1d6-474a-b4fa-3ef3cd93d5bb",
    author: { name: 'Jane Doe', handle: '@janedoe', avatar: '/avatars/jane-doe.jpg', isVerified: true },
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptates tenetur atque alias at, deserunt, ipsum, nesciunt distinctio quod commodi optio? Vel nesciunt perspiciatis ea, at laborum delectus doloremque consectetur cupiditate?",
    timestamp: '5m',
    replies: [],
    likes: 23,
    reposts: 5,
    isBookmarked: false,
    isLiked: false,
    isReposted: false,
  }
]

const Home = () => {
  return (
    <div className="space-y-4 p-4">
      {tweets.map((tweet) => <PostCard key={tweet.id} {...tweet} />)}
    </div>
  );
}

export default Home;