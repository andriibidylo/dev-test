import Link from "next/link";

interface Page {
  id: number;
  title: {
    rendered: string;
  };
}

interface DropdownMenuProps {
  pages: Page[];
}

export default function DropdownMenu({ pages }: DropdownMenuProps) {

  function generateUrlSlug(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") 
      .replace(/[^\w\.\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  return (
    <div>
      {pages.map((page) => {
        const slug = generateUrlSlug(`${page.id}_${page.title.rendered}`); // Generate slug for each page
        return (
          <Link
            key={page.id}
            href={`/pages/${slug}`}
            className="block px-4 py-2 hover:bg-gray-200"
          >
            {page.title.rendered}
          </Link>
        );
      })}
    </div>
  );
}
