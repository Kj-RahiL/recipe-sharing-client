/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import FeedCard from "../components/feed/FeedCard";
import SidebarSection from "./SidebarSection";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const FeedItem = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const handleSearch = () => {
    console.log(searchTerm, sortOption);
    router.push(`/feed?searchTerm=${searchTerm}&sort=${sortOption}`);
  };

  const handleSortChange = (e: any) => {
    setSortOption(e.target.value);
    // setPage(1); // Reset to page 1 on sort change
  };
  return (
    <div className=" min-h-screen dark:bg-black light:bg-white ">
      {" "}
      <div className="flex justify-between p-2 md:p-4 bg-gray-100 dark:bg-black">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="border p-2 rounded-md w-full flex-1"
        />
        <button
          onClick={handleSearch}
          className="ml-0 md:ml-4 button-bg text-white px-4 py-2 rounded-md flex items-center"
        >
          {/* Show only the icon on small screens */}
          <Search className="h-5 w-5 sm:hidden" aria-hidden="true" />

          {/* Show both the icon and text on medium and larger screens */}
          <span className="hidden sm:inline-flex items-center">
            <Search className="h-5 w-5 mr-2" aria-hidden="true" /> Search
          </span>
        </button>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border p-2 rounded-md ml-2 md:ml-4 md:hidden block text-sm "
        >
          <option value="latest">Latest</option>
          <option value="rating">Top Rated</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-1 hidden md:block">
          {/* sort */}
          <div className="p-4 bg-gray-100 dark:bg-black">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border p-2 rounded-md ml-4 "
            >
              <option value="latest">Latest</option>
              <option value="rating">Top Rated</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          {/* filter */}
          <div className="p-4 bg-gray-100 dark:bg-black">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border p-2 rounded-md ml-4 "
            >
              <option value="latest">Latest</option>
              <option value="rating">Top Rated</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="col-span-2 w-full px-2 md:px-4 overflow-y-auto max-h-screen bg-gray-100 dark:bg-black">
          {/* Feed Section */}

          <FeedCard searchParams={{ searchTerm, sortOption }} />
        </div>
        {/* Sticky Sidebar Section */}
        <div className="col-span-1 hidden md:block">
          <div className="sticky top-0 ">
            <SidebarSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
