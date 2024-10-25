/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { RecipeResponse } from "@/types";
import { revalidateTag } from "next/cache";

export const createRecipe = async (recipeData:any) => {
  const { data } = await nexiosInstance.post<RecipeResponse>(`/recipe`,  recipeData,);
  revalidateTag('RECIPE')
  console.log(data);
  return data;
};

// export const getAllRecipe = async (queryParams: Record<string, any>) => {
//   const queryString = new URLSearchParams(queryParams).toString();
//   const { data } = await nexiosInstance.get(`/recipe?page=${queryString}`, {
//     cache: "no-store",
//   });
//   console.log(data);
//   return data;
// };
export const getAllRecipe = async (page?:number) => {
  const { data } = await nexiosInstance.get(`/recipe?page=${page}`, {
    next: {
      tags: ['RECIPE']
    }
  });
  // console.log(data);
  return data;
};

export const getRecipeById = async (id: string) => {
  const { data } = await nexiosInstance.get<any>(`/recipe/${id}`, {
    cache: "no-store",
  });
  console.log(JSON.stringify(data, null, 2), 'getRecipeById'); 
  return data;
};

export const updateRecipe = async (id: string, updateData: any) => {
  console.log({id, updateData})
  try {
    const { data } = await nexiosInstance.put(`/recipe/${id}`, updateData, {
      cache: "no-store",
    });
    console.log(`Updated recipe: ${id}`, data);
    return data;
  } catch (error) {
    console.error(`Failed to update recipe with ID: ${id}`, error);
    throw error;
  }
};

// Delete a specific recipe
export const deleteRecipe = async (id: string) => {
  try {
    const {data} = await nexiosInstance.delete(`/recipe/${id}`, {
      next: {
        tags: ['RECIPE']
      }
    });
    return data
  } catch (error) {
    console.error(`Failed to delete recipe with ID: ${id}`, error);
    throw error;
  }
  
};
