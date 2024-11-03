"use client";

import { useUser } from "@/context/user.provider";
import { useGetSingleUser } from "@/hooks/user.hook";
import { getManageRecipe } from "@/services/RecipeService";
import { Avatar } from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShareComponent from "../feed/ShareComponent";
import { TRecipe } from "@/types";


interface UserCreatedPostProps {
  userId: string;
}

const UserCreatedPost = ({ userId }: UserCreatedPostProps) => {
  const { user } = useUser();
  const { data: userData } = useGetSingleUser(user?.id as string);
  const [recipes, setRecipes] = useState<TRecipe[] | null>(null);

  const fetchRecipes = async () => {
    try {
      const res = await getManageRecipe();
      const newFeeds = (res as { data: TRecipe[] }).data;
      setRecipes(newFeeds);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, [userId]);

  const createdRecipes = recipes?.filter(
    (recipe) => recipe.author?._id === userId
  );

  return (
    <div className="gird grid-cols-1 gap-5 ">
      {createdRecipes?.map((recipe:TRecipe) => (
        <div key={recipe._id} className="p-4  rounded-lg shadow-md space-y-2 mb-10">
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

          <div>
            <h2 className="text-base font-medium">{recipe?.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-400 break-words whitespace-normal">{recipe?.description}</p>
          </div>

          <div className="relative">
            <Image
              src={recipe.image}
              alt="Recipe Image"
              width={600}
              height={400}
              className="rounded-lg h-96"
            />
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <span>{recipe.difficulty}</span>
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
            <ShareComponent feed={recipe} user={userData?.data}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCreatedPost;
