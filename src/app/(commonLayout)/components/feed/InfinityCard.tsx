/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { TRecipe } from "@/types";
import { useUser } from "@/context/user.provider";
import { useRecipe } from "@/hooks/recipe.hook";

// Fetcher function for recipes
const getRecipes = async ({ pageParam = 1 }) => {
  const res = await fetch(` http://localhost:5000/api/recipe?page=${pageParam}&limit=10`);
  const data = await res.json();
  console.log(data)
  return { ...data, prevPage: pageParam };
};

const InfinityCard = () => {
  const { user } = useUser();
  const router = useRouter();
  const { upvoteMutation, downvoteMutation, commentMutation } = useRecipe();

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  // Infinite Query Hook
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    initialPageParam: 1,
    queryFn: getRecipes,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevPage * 10 >= lastPage.total) return false;
      return lastPage.prevPage + 1;
    },
  });

  const recipes = data?.pages.reduce((acc, page) => [...acc, ...page.recipes], []);

  const toggleCommentInput = (id: string) => {
    setActiveCommentId(activeCommentId === id ? null : id);
    setComment("");
  };

  const handleCommentSubmit = (feedId: string) => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }
    commentMutation.mutate({ recipeId: feedId, comment });
    setComment("");
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: "Check out this amazing recipe!",
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Share feature not supported in this browser.");
    }
  };

  const handleFeedClick = (id: string) => router.push(`/feed/${id}`);
  const handleUserClick = (id: string) => router.push(`/user/${id}`);

  return (
    <div>
      <InfiniteScroll
        dataLength={recipes ? recipes.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<p>Loading more recipes...</p>}
        endMessage={<p className="text-center">No more recipes to load.</p>}
      >
        <div className="grid grid-cols-1">
          {recipes &&
            recipes.map((feed: TRecipe) => (
              <div
                key={feed._id}
                className="p-4 mb-10 rounded-lg shadow-md cursor-pointer dark:bg-gray-900 dark:text-white"
              >
                <div
                  className="flex items-center mb-4"
                  onClick={() => handleUserClick(feed.author._id!)}
                >
                  <Avatar
                    src={feed.author.image}
                    alt={feed.author.name}
                    size="md"
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-bold text-lg">{feed.author.name}</p>
                    <p className="text-gray-500 text-sm">{feed.author.email}</p>
                  </div>
                </div>

                <div onClick={() => handleFeedClick(feed._id)}>
                  <img
                    src={feed.image}
                    alt={feed.title}
                    className="rounded-lg h-96 mb-3"
                  />
                  <div>
                    <p className="font-bold text-lg">{feed.title}</p>
                    <p className="text-gray-500 text-sm">{feed.description}</p>
                    <p>{feed.cookingTime}</p>
                    <p>{feed.difficulty}</p>
                  </div>
                </div>

                <div className="flex justify-around mt-4 text-gray-600">
                  <button
                    onClick={() => upvoteMutation.mutate(feed._id)}
                    className={`flex items-center space-x-1 ${
                      feed.upVotes?.includes(user?.id) ? "text-blue-600" : ""
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{feed.upVotes.length} Likes</span>
                  </button>
                  <button
                    onClick={() => downvoteMutation.mutate(feed._id)}
                    className={`flex items-center space-x-1 ${
                      feed.downVotes?.includes(user?.id) ? "text-amber-600" : ""
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    <span>{feed.downVotes.length} Dislikes</span>
                  </button>
                  <button
                    onClick={() => toggleCommentInput(feed._id)}
                    className="flex items-center space-x-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                  </button>
                  <button
                    onClick={() => handleShare(feed.title)}
                    className="flex items-center space-x-1"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {activeCommentId === feed._id && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Avatar
                      src={user?.image}
                      alt={user?.name}
                      size="md"
                      className="rounded-full"
                    />
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 p-2 border rounded-lg dark:bg-gray-800"
                    />
                    <button
                      onClick={() => handleCommentSubmit(feed._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfinityCard;
