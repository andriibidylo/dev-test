import axios from "axios";

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    _acf_changed: boolean;
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  acf: any[]; // Adjust the type based on the actual structure of ACF data if needed
  _links: {
    self: any[];
    collection: any[];
    about: any[];
    author: any[];
    replies: any[];
    [key: string]: any; // Index signature for additional dynamic links
  };
}
export default async function Home() {
  const { data: posts } = await axios.get<Post[]>(
    `https://dev-test.yourballistic.com/wp-json/wp/v2/posts`
  );
  const sortedPosts = posts.sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold my-8">Recent Posts</h1>
        <ul className="space-y-6">
          {sortedPosts.map((post, index) => (
            <li
              key={post.id}
              className={`p-4 border rounded-lg ${
                index === 0 ? "bg-blue-300 border-blue-300" : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2">
                {post.title.rendered}
              </h3>
              <span>{post.date}</span>
              <p
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              ></p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
