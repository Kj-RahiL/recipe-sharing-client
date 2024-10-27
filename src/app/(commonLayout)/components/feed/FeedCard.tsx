/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar } from "@nextui-org/react"; 
import { useGetAllRecipe, useVoteRecipe } from "@/hooks/recipe.hook";


const FeedCard = () => {
  const router = useRouter();

  // Fetch all recipes using the hook
  const { data: recipes, isLoading, isError } = useGetAllRecipe();
  const { upvoteMutation, downvoteMutation } = useVoteRecipe();

  console.log(recipes)

  const handleFeedClick = (id: string) => router.push(`/feed/${id}`);
  const handleUserClick = (id: string) => router.push(`/user/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load recipes.</p>;

  return (
    <div className="grid grid-cols-1">
      {recipes?.data?.map((feed: any) => (
        <div
          key={feed?._id}
          className="p-4 mb-10 rounded-lg shadow-md cursor-pointer dark:bg-gray-900 dark:text-white light:bg-white"
        >
          <div className="flex items-center mb-4" onClick={() => handleUserClick(feed.author._id)}>
            <Avatar src={feed.author.image} alt={feed.author.name} size="md" className="rounded-full" />
            <div className="ml-3">
              <p className="font-bold text-lg">{feed.author.name}</p>
              <p className="text-gray-500 text-sm">{feed.author.email}</p>
            </div>
          </div>

          <div onClick={() => handleFeedClick(feed._id)}>
            <Image
              src={feed.image}
              alt={feed.title}
              width={600}
              height={300}
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
            <button onClick={() => upvoteMutation.mutate(feed._id)} className="flex items-center space-x-1">
              <ThumbsUp className="w-5 h-5" />
              <span>{feed.upVotes.length} Likes</span>
            </button>
            <button onClick={() => downvoteMutation.mutate(feed._id)} className="flex items-center space-x-1">
              <ThumbsDown className="w-5 h-5" />
              <span>{feed.downVotes.length} Dislikes</span>
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
    </div>
  );
};

export default FeedCard;
