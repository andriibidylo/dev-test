"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            tabIndex={0} // Makes the div focusable
            onBlur={(e) => {
              // Check if the related target is outside the dropdown
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}
          >
            <button onClick={toggleDropdown} className="hover:underline">
              Pages
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black mt-1 p-2 shadow-lg">
                <Link
                  href="/page1"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Page 1
                </Link>
                <Link
                  href="/page2"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Page 2
                </Link>
                {/* Add more pages dynamically from the API */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
