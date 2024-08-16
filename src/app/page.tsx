import axios from "axios";

import { PostType } from "./types/blogPost";
import PostCard from "./components/PostCard";

export default async function Home() {
  const { data: posts } = await axios.get<PostType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?acf_format=standard&orderby=date&_fields=id,title,featured_media,excerpt&per_page=3`
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">Recent Posts</h1>
        <ul className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={post.id} index={index} post={post} />
          ))}
        </ul>
      </div>
    </main>
  );
}
