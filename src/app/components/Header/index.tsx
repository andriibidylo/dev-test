"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import DropdownMenu from "../DropdownMenu";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: pages, error } = useSWR(
    "https://dev-test.yourballistic.com/wp-json/wp/v2/pages?acf_format=standard&_fields=id,title",
    fetcher
  );
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
          <div
            className="relative"
            ref={dropdownRef}
            tabIndex={0}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}
          >
            <button onClick={toggleDropdown} className="hover:underline">
              Pages
            </button>
            {isDropdownOpen && <DropdownMenu pages={pages} />}
          </div>
        </div>
      </nav>
    </header>
  );
}
