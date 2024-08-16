"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import classNames from "classnames";
import fetcher from "@/app/utils/fetcher";
import useSWR from "swr";
import generateUrlSlug from "@/app/utils/generateUrlSlug";
import { PostType } from "@/app/types/blogPost";

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ["style", "script", "iframe"],
    ALLOWED_TAGS: ["p", "h2", "ul", "li", "figure", "img", "video"],
  });
};

export default function PostCard({
  post,
  index,
}: {
  post: PostType;
  index: number;
}) {
  const { data: imageData, error } = useSWR(
    post.featured_media > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}/media/${post.featured_media}`
      : null,
    fetcher
  );

  // Clean up the HTML that we receive from the API !IMPORTANT
  const cleanHTMLExcerpt = useMemo(
    () => sanitizeHtml(post.excerpt.rendered),
    [post.excerpt.rendered]
  );

  const urlSlug = `${post.id}_${generateUrlSlug(post.title.rendered)}`;

  return (
    <Link href={`/posts/${urlSlug}`}>
      <li
        key={post.id}
        className={classNames(
          "p-4 border rounded-lg",
          index === 0 ? "bg-blue-300 border-blue-300" : "border-gray-200"
        )}
      >
        <h3 className="text-2xl font-semibold mb-2">{post.title.rendered}</h3>
        {imageData?.media_details.sizes.large && (
          // Make images blurry at the beginning, add appropriate alt text (maybe from the API), and adjust the dimensions
          <Image
            src={imageData?.media_details.sizes.large.source_url}
            alt="Featured Media"
            width={imageData?.media_details.sizes.large.width}
            height={imageData?.media_details.sizes.large.height}
          />
        )}
        <p dangerouslySetInnerHTML={{ __html: cleanHTMLExcerpt }} />
      </li>
    </Link>
  );
}
