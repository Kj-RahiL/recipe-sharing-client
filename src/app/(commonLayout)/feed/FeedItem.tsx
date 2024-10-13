"use client"

import { useTheme } from "next-themes";
import FeedCard from "../components/feed/FeedCard";
import SidebarSection from "./SidebarSection";

const FeedItem = () => {
    const {theme} = useTheme()
  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Post Feed Section */}
      <div className="w-2/3 p-6 overflow-y-auto max-h-screen">
        <FeedCard />
      </div>

      {/* Sticky Sidebar Section */}
      <div className="w-1/3 p-6">
        <div className="sticky top-0">
          <SidebarSection />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
