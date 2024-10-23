"use client";

import { getAllRecipe } from "@/services/RecipeService";
import { Avatar } from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Recipe {
  _id: string;
  author: {
    _id: string;
    name: string;
    image: string;
  };
  image: string;
}

interface UserCreatedPostProps {
  userId: string;
}

const UserCreatedPost = ({ userId }: UserCreatedPostProps) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipe(1);
      const newFeeds = (res as { data: Recipe[] }).data;
      setRecipes(newFeeds);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userId]);

  const createdRecipes = recipes?.filter(
    (recipe) => recipe.author._id === userId
  );

  return (
    <div className="gird grid-cols-1 gap-5">
      {createdRecipes?.map((recipe) => (
        <div key={recipe._id} className="p-4 bg-white rounded-lg shadow-md space-y-2 mb-10">
          <div className="flex items-center">
            <Avatar
              src={recipe.author.image}
              alt={recipe.author.name}
              size="sm"
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-bold text-sm">{recipe.author.name}</p>
              <p className="text-gray-500 text-xs">10h</p>
            </div>
            <button className="ml-auto">
              <MoreHorizontal className="text-gray-500" />
            </button>
          </div>

          <p className="text-sm">
            Great recipe. Easy to make. I used spicy guacamole instead of plain avocado and Sriracha.
          </p>

          <div className="relative">
            <Image
              src={recipe.image}
              alt="Recipe Image"
              width={600}
              height={400}
              className="rounded-lg h-96"
            />
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <span>Made it</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCreatedPost;
