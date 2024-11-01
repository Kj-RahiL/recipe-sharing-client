/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import FeedCard from "../components/feed/FeedCard";
import SidebarSection from "./SidebarSection";
import { useRouter } from "next/navigation";

const FeedItem = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const handleSearch = () => {
    console.log(searchTerm, sortOption); 
    router.push(
      `/feed?searchTerm=${searchTerm}&sort=${sortOption}`
    );
  };

  const handleSortChange = (e:any) => {
    
    setSortOption(e.target.value);
    // setPage(1); // Reset to page 1 on sort change
  };
  return (
    <div className="flex min-h-screen dark:bg-black light:bg-white">
      {" "}
      <div className="w-2/3">
        <div className="flex justify-between p-4 bg-gray-100 dark:bg-black">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="border p-2 rounded-md w-full"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
        {/* Post Feed Section */}
        <div className="w-full p-6 overflow-y-auto max-h-screen">
          <FeedCard searchParams={{ searchTerm, sortOption }}/>
          
           {/* <InfiniteCard/> */}
        </div>
      </div>
      {/* Sticky Sidebar Section */}
      <div className="w-1/3 ">
        <div className="sticky top-0 ">
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
          <SidebarSection />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
