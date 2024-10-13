/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { MessageCircle, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllRecipe } from "@/services/RecipeService";

const FeedCard = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { theme } = useTheme(); // Get the current theme

  const fetchFeeds = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getAllRecipe(page);
      const newFeeds = (response as { data: any[] }).data;

      if (newFeeds.length > 0) {
        setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
        if (newFeeds.length < 5) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching feeds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={feeds.length}
      next={() => setPage((prev) => prev + 1)}
      hasMore={hasMore}
      loader={<p className="text-center">Loading more feeds...</p>}
      endMessage={<p className="text-center"><b>You have seen it all!</b></p>}
    >
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className={`p-4 mb-10 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          <div className="flex items-center mb-4">
            <Image
              src={feed?.author?.image}
              alt="User avatar"
              width={40}
              height={50}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold text-lg">{feed?.author?.name}</p>
              <p className="text-gray-500 text-sm">{feed?.author?.email}</p>
            </div>
          </div>

          <div className="relative mb-3">
            <Image
              src={feed?.image}
              alt={feed?.title}
              width={600}
              height={300}
              className="rounded-lg"
            />
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Made it ✅
            </span>
          </div>

          <div className="flex justify-around mt-4 text-gray-600">
            <button className="flex items-center space-x-1">
              <ThumbsUp className="w-5 h-5" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1">
              <ThumbsDown className="w-5 h-5" />
              <span>Dislike</span>
            </button>
            <button className="flex items-center space-x-1">
              <MessageCircle className="w-5 h-5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default FeedCard;
