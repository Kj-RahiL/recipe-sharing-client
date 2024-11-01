/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/user.provider";
import { createRecipe, updateRecipe } from "@/services/RecipeService";
import { RecipeFormData, TRecipe } from "@/types";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";

interface RecipeFormProps {
  existingRecipe?: TRecipe | null; 
  onClose: () => void; 
}

const RecipeForm: React.FC<RecipeFormProps> = ( {existingRecipe, onClose} ) => {

  const { user } = useUser();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    defaultValues: existingRecipe || {
      ingredients: [{ name: "", quantity: "", type: "" }],
      steps: [{ description: "", duration: "" }],
      category: "",
      tags: "",
      isPublished: true,
      isPremium: false,
    },
  });

  // Initialize form with existing recipe values when in edit mode
  useEffect(() => {
    if (existingRecipe) {
      reset(existingRecipe); // Populate form with existing recipe data
    }
  }, [existingRecipe, reset]);

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    const  { ...updateData } = {
      ...data,
      category: Array.isArray(data.category)
        ? data.category
        : data.category.split(",").map((cat) => cat.trim()),

      tags: Array.isArray(data.tags)
        ? data.tags
        : data.tags.split(",").map((tag) => tag.trim()),
        // author: user?.id
    };
const create = { ...updateData, author: user?.id };

  
    console.log(updateData, 'esss');

    try {
      let response;
      if (existingRecipe) {
        // Update recipe if editing
        response = await updateRecipe(existingRecipe?._id, updateData);
        console.log(response)
        toast.success("Recipe updated successfully!");
        onClose()
      } else {
        // Create new recipe if no existing recipe data
        response = await createRecipe(create);
        toast.success("Recipe created successfully!");
      }
      console.log(response);
      reset();
      onClose(); 
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Field */}
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

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="input-field"
            placeholder="Describe your recipe"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        {/* Image URL Field */}
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

        {/* Other Fields */}
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

      {/* Ingredient Fields */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Ingredients
        </h2>
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
          className="btn button-bg"
        >
          Add Ingredient
        </button>
      </div>

      {/* Steps Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Steps
        </h2>
        {stepFields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-4">
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
          onClick={() => addStep({ description: "", duration: "" })}
          className="btn button-bg"
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
        {!existingRecipe && (
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("isPublished")} />
            <span>Is Published</span>
          </label>
        )}
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isPremium")} />
          <span>Is Premium</span>
        </label>
      </div>
      <button type="submit" className="btn button-bg w-full">
        {existingRecipe ? "Update Recipe" : "Create Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
