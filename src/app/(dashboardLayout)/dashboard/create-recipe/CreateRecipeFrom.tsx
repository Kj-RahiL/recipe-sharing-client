/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/user.provider";
import { createRecipe } from "@/services/RecipeService";
import { RecipeFormData } from "@/types";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const RecipeForm: React.FC = () => {
  const { user,  } = useUser();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    defaultValues: {
      ingredients: [{ name: "", quantity: "", type: "" }],
      steps: [{ description: "", duration: '' }],
      category: "",
      tags: "",
      isPublished: true,
      isPremium: false,
    },
  });

  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } =
    useFieldArray({ control, name: "ingredients" });

  const { fields: stepFields, append: addStep, remove: removeStep } =
    useFieldArray({ control, name: "steps" });
    

  const onSubmit: SubmitHandler<RecipeFormData> = async(data) => {
    const processedData = {
        ...data,
        category: data.category.split(',').map((cat: any) => cat.trim()) as string[], 
        tags: data.tags.split(',').map((tag: any) => tag.trim()),
        author: user?.id, 
      };
    console.log("Submitted Data:", data);
    const response = await createRecipe(processedData)
    console.log(response, 'subit')
    toast.success(response?.message)
    reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg space-y-8"
    >
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Create a New Recipe
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input-field"
            placeholder="Recipe Title"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="input-field"
            placeholder="Describe your recipe"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            {...register("image")}
            className="input-field"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            {...register("cookingTime")}
            className="input-field"
            placeholder="e.g., 30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Servings
          </label>
          <input
            type="number"
            {...register("servings")}
            className="input-field"
            placeholder="e.g., 4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty
          </label>
          <select {...register("difficulty")} className="input-field">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ingredients</h2>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4">
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder="Name"
              className="input-field flex-1"
            />
            <input
              {...register(`ingredients.${index}.quantity`)}
              placeholder="Quantity"
              className="input-field flex-1"
            />
            <input
              {...register(`ingredients.${index}.type`)}
              placeholder="Type"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addIngredient({ name: "", quantity: "", type: "" })}
          className="button-bg btn"
        >
          Add Ingredient
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Steps</h2>
        {stepFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4 ">
            <input
              {...register(`steps.${index}.description`)}
              placeholder="Description"
              className="input-field flex-1"
            />
            <input
              type="number"
              {...register(`steps.${index}.duration`)}
              placeholder="Duration (minutes)"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addStep({ description: "", duration: '' })}
          className="button-bg btn"
        >
          Add Step
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Categories (comma-separated)
        </label>
        <input
          {...register("category")}
          placeholder="e.g., Dessert, Snack"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags (comma-separated)
        </label>
        <input
          {...register("tags")}
          placeholder="e.g., vegetarian, gluten-free"
          className="input-field"
        />
      </div>

      <div className="flex space-x-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPublished")} />
          <span>Is Published</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPremium")} />
          <span>Is Premium</span>
        </label>
      </div>

      <button type="submit" className="button-bg btn w-full">
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
