/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRecipeById } from "@/services/RecipeService";// Icons
import { Textarea, Button } from "@nextui-org/react"; // For comment input
import { Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { useUser } from "@/context/user.provider";

const FeedDetails = () => {
    const {user} = useUser()
  const { feedId } = useParams(); // Get recipe ID from route parameters
  const [recipe, setRecipe] = useState<any>(null);
  const [comment, setComment] = useState<string>(""); // Comment input state
  const [comments, setComments] = useState<any[]>([]); // State to track all comments
  const [upVotes, setUpVotes] = useState<number>(0);
  const [downVotes, setDownVotes] = useState<number>(0);

  // Fetch recipe details
  const fetchFeeds = async () => {
    try {
      const response = await getRecipeById(feedId as string);
      const recipeData = response?.data;
      setRecipe(recipeData);
      setComments(recipeData?.comment || []); // Set initial comments
      setUpVotes(recipeData.upVotes.length); // Initialize upvotes
      setDownVotes(recipeData.downVotes.length); // Initialize downvotes
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  useEffect(() => {
    if (feedId) fetchFeeds();
  }, [feedId]);

  // Handle comment submission
  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        _id: new Date().toISOString(), // Temporary ID
        text: comment,
        author: user?.name || 'user', 
        authorEmail: user?.email, 
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setComment(""); // Clear input
    }
  };

  // Handle upvote/downvote
  const handleUpVote = () => setUpVotes(upVotes + 1);
  const handleDownVote = () => setDownVotes(downVotes + 1);

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

  if (!recipe) return <p>Loading...</p>;

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
      <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((ingredient: any) => (
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
          {recipe.steps.map((step: any, index: number) => (
            <li key={index} className="mb-2">
              {step.description} (Duration: {step.duration} mins)
            </li>
          ))}
        </ol>
      </div>

      {/* Upvote, Downvote, and Share */}
      <div className="flex items-center space-x-6 mt-6">
        <button
          className="flex items-center space-x-1 text-green-500"
          onClick={handleUpVote}
        >
          <ThumbsUp /> <span>{upVotes}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-red-500"
          onClick={handleDownVote}
        >
          <ThumbsDown /> <span>{downVotes}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-blue-500"
          onClick={handleShare}
        >
          <Share /> <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <ul className="space-y-4">
          {comments.map((cmt) => (
            <li key={cmt._id} className="border-b pb-2">
              <p className="font-semibold">{cmt.author}</p>
              <p className="text-gray-700">{cmt.authorEmail}</p>
              <p>{cmt.text}</p>
              <p className="text-gray-500 text-base">
                {new Date(cmt.createdAt).toLocaleString()}
              </p>
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
          <Button onClick={handleAddComment} className="mt-2" color="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
