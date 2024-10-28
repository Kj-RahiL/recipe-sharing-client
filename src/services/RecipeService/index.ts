/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { RecipeResponse } from "@/types";
import { log } from "console";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createRecipe = async (recipeData:any) => {
  const { data } = await nexiosInstance.post<RecipeResponse>(`/recipe`,  recipeData,);
  revalidateTag('RECIPE')
  // console.log(data);
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
export const getAllRecipe = async () => {
  const { data } = await nexiosInstance.get(`/recipe`, {
    next: {
      tags: ['RECIPE']
    }
  });
  // console.log(data, 'ree');
  return data;
};

export const getRecipeById = async (id: string) => {
  const { data } = await nexiosInstance.get<any>(`/recipe/${id}`, {
    cache: "no-store",
  });
  // console.log(JSON.stringify(data, null, 2), 'getRecipeById'); 
  return data;
};

export const updateRecipe = async (id: string, updateData: any) => {
  // console.log({id, updateData})
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


export const upvoteRecipe = async (recipeId: string) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const {data} = await nexiosInstance.post(`/recipe/upvote`, { recipeId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    });
    revalidateTag("RECIPE")
    return data
  } catch (error) {
    console.error(`Failed to upvote recipe with ID: ${recipeId}`, error);
    throw error;
  }
};

export const downvoteRecipe = async (recipeId: string) => {
  console.log(recipeId)
  const token = cookies().get("accessToken")?.value;
  try {
    const {data} = await nexiosInstance.post(`/recipe/downVote`, { recipeId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    });
    revalidateTag("RECIPE")
    return data
  } catch (error) {
    console.error(`Failed to downvote recipe with ID: ${recipeId}`, error);
    throw error;
  }
};

export const commentOnRecipe = async (recipeId: string, comment: string) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const {data} = await nexiosInstance.post(`/recipe/comment/${recipeId}`, {  comment }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    });
    console.log(data)
    revalidateTag("RECIPE")
    return data
  } catch (error) {
    console.error(`Failed to comment recipe with ID: ${recipeId}`, error);
    throw error;
  }
};
export const rateRecipe = async (recipeId:string, rating: number) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const {data} = await nexiosInstance.post(`/recipe/rate/${recipeId}`, {rating}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      }});
      revalidateTag("RECIPE")
    return data
  } catch (error) {
    console.error(`Failed to comment recipe with ID: ${recipeId}`, error);
    throw error;
  }
};
