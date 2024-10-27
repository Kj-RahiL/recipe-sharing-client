/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRecipeById } from "@/services/RecipeService"; // Icons
import { Textarea, Button, Avatar } from "@nextui-org/react"; // For comment input
import { Ellipsis, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useUser } from "@/context/user.provider";
import { useGetRecipeById, useRecipe } from "@/hooks/recipe.hook";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const FeedDetails = () => {
  const { user } = useUser();
  const { feedId } = useParams();
  const { data, isLoading, error } = useGetRecipeById(feedId as string);
  const { upvoteMutation, downvoteMutation, commentMutation, rateMutation,  } = useRecipe();
  const [comment, setComment] = useState<string>(""); // Comment input state
  const recipe = data?.data;
  const recipeId = feedId as string;

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }
    commentMutation.mutate({ recipeId, comment });
    setComment("");
  };

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe?.title,
          text: "Check out this amazing recipe!",
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Share feature not supported in this browser.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      {recipe.author && (
        <div className="flex items-center mb-6">
          <Image
            src={recipe.author.image}
            alt="Author avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-bold">{recipe.author.name}</p>
            <p className="text-gray-500">{recipe.author.email}</p>
          </div>
        </div>
      )}
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={800}
        height={400}
        className="rounded-lg mb-6 h-96"
      />
      <p className="text-lg mb-4">{recipe.description}</p>
      <p>
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </p>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}
      </p>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients?.map((ingredient: any) => (
            <li key={ingredient._id}>
              {ingredient.quantity} of {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Steps</h2>
        <ol className="list-decimal pl-5">
          {recipe.steps?.map((step: any, index: number) => (
            <li key={index} className="mb-2">
              {step.description} (Duration: {step.duration} mins)
            </li>
          ))}
        </ol>
      </div>

      {/* Upvote, Downvote, and Share */}
      <div className="flex justify-around mt-4 text-gray-600">
        <button
          onClick={() => upvoteMutation.mutate(recipe._id)}
          className={`flex items-center space-x-1 ${
            recipe.upVotes?.includes(user?.id) ? "text-blue-600" : ""
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{recipe.upVotes?.length} Likes</span>
        </button>
        <button
          onClick={() => downvoteMutation.mutate(recipe._id)}
          className={`flex items-center space-x-1 ${
            recipe.downVotes?.includes(user?.id) ? "text-amber-600" : ""
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{recipe.downVotes?.length} Dislikes</span>
        </button>
        <button onClick={handleShare} className="flex items-center space-x-1">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <ul className="space-y-6">
          {recipe?.comment?.map((cmt: any) => (
            <li key={cmt._id} className="border-b border-gray-300 pb-4">
              <div className="flex items-start gap-3">
                <Avatar
                  src={cmt?.user?.image}
                  alt={cmt?.user?.name}
                  size="md"
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p className="font-semibold text-base">
                        {cmt?.user?.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {cmt?.user?.email}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-500 text-xs mr-4">
                        {formatDistanceToNow(new Date(cmt.date), {
                          addSuffix: true,
                        })}
                      </p>
                      <Ellipsis />
                    </div>
                  </div>
                  <p className="text-gray-800 text-base mt-2">{cmt.comment}</p>
                  <div className="flex space-x-6 mt-2 text-sm text-gray-500">
                    <button className="hover:underline">Like</button>
                    <button className="hover:underline">Reply</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Comment Input */}
        <div className="mt-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            fullWidth
          />
          <Button
            onClick={handleCommentSubmit}
            className="mt-2"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
