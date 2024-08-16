import { DetailedPostProps, DetailedPostType } from "@/app/types/blogPost";
import axios from "axios";

export default async function DetailedPost({ params }: DetailedPostProps) {
  let post: DetailedPostType | null = null;

  if (params.id) {
    const postId = params.id.match(/^\d+/);
    if (postId) {
      const { data } = await axios.get<DetailedPostType>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId[0]}?acf_format=standard&_fields=id,title,content,acf`
      );
      post = data;
    }
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}
