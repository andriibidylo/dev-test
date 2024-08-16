"use client";

import DOMPurify from "dompurify";
import { PostType } from "@/app/types/post";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

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
  const cleanHTMLExcerpt = useMemo(
    () => sanitizeHtml(post.excerpt.rendered),
    [post.excerpt.rendered]
  );

  const [imageData, setImageData] = useState<{
    large?: { source_url: string; width: number; height: number };
  } | null>(null);

  const getFeaturedMedia = async () => {
    try {
      const { data } = await axios.get(
        `https://dev-test.yourballistic.com/wp-json/wp/v2/media/${post.featured_media}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching featured media:", error);
      return null;
    }
  };

  useEffect(() => {
    if (post.featured_media > 0) {
      getFeaturedMedia().then((data) => {
        if (data?.media_details?.sizes) {
          setImageData(data.media_details.sizes);
        }
      });
    }
  }, [post.featured_media]);
  function generateUrlSlug(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\.\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }
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
        {imageData?.large && (
          <Image
            src={imageData.large.source_url}
            alt="Featured Media"
            width={imageData.large.width}
            height={imageData.large.height}
          />
        )}
        <p dangerouslySetInnerHTML={{ __html: cleanHTMLExcerpt }} />
      </li>
    </Link>
  );
}
