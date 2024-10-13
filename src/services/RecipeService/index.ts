"use server"

import nexiosInstance from "@/config/nexios.config";


export const getAllRecipe = async (page:number) => {
    const {data} = await nexiosInstance.get(`/recipe?page=${page}`, {
        cache: "no-store",
      });
      console.log(data)
    return data;
  };