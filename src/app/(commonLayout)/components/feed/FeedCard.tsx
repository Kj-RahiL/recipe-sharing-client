/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { MessageCircle, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllRecipe } from "@/services/RecipeService";
import { Avatar } from "@nextui-org/react";

const FeedCard = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { theme } = useTheme();
  const router = useRouter(); // Router for navigation

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

  const handleFeedClick = (id: string) => {
    router.push(`/feed/${id}`); // Navigate to the feed details page
  };
  const handleUserClick = (id: string) => {
    router.push(`/user/${id}`); // Navigate to the feed details page
  };

  return (
    <InfiniteScroll
      dataLength={feeds.length}
      next={() => setPage((prev) => prev + 1)}
      hasMore={hasMore}
      loader={<p className="text-center">Loading more feeds...</p>}
      endMessage={
        <p className="text-center">
          <b>You have seen it all!</b>
        </p>
      }
    >
      {feeds.map((feed) => (
        <div
          key={feed._id}
          className={`p-4 mb-10 rounded-lg shadow-md cursor-pointer ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          <div
            className="flex items-center mb-4"
            onClick={() => handleUserClick(feed?.author._id)}
          >
            <Avatar
              src={feed?.author?.image}
              alt={feed.author.name}
              size="md"
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold text-lg">{feed?.author?.name}</p>
              <p className="text-gray-500 text-sm">{feed?.author?.email}</p>
            </div>
          </div>
          <div onClick={() => handleFeedClick(feed._id)}>
            <div className="relative mb-3">
              <Image
                src={feed?.image}
                alt={feed?.title}
                width={600}
                height={300}
                className="rounded-lg h-96"
              />
            </div>
            <div>
              <p className="font-bold text-lg">{feed?.title}</p>
              <p className="text-gray-500 text-sm">{feed?.description}</p>
              <p>{feed.cookingTime}</p>
              <p>{feed.difficulty}</p>
            </div>
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
