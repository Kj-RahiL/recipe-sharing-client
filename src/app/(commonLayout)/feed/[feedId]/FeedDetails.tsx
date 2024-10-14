"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRecipeById } from "@/services/RecipeService";

const FeedDetails = () => {
  const { id } = useParams(); // Get recipe ID from route parameters
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    if (id) fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
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
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={800}
        height={400}
        className="rounded-lg mb-6"
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
    </div>
  );
};

export default FeedDetails;
