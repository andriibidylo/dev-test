import { DropdownMenuProps } from "@/app/types/blogPage";
import generateUrlSlug from "@/app/utils/generateUrlSlug";
import Link from "next/link";

export default function DropdownMenu({
  pages,
  isLoading,
  error,
}: DropdownMenuProps) {
  if (error) {
    return <p>Failed to fetch pages</p>;
  }
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div>
      {pages.map((page) => {
        const urlSlug = `${page.id}_${generateUrlSlug(page.title.rendered)}`; // Generate slug for each page
        return (
          <Link
            key={page.id}
            href={`/pages/${urlSlug}`}
            className="block px-4 py-2 hover:bg-gray-200"
          >
            {page.title.rendered}
          </Link>
        );
      })}
    </div>
  );
}
