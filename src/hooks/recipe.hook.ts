/* eslint-disable @typescript-eslint/no-explicit-any */

import { commentOnRecipe, createRecipe, downvoteRecipe, getAllRecipe, getRecipeById, rateRecipe, upvoteRecipe } from "@/services/RecipeService";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateRecipe = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (userData) => await createRecipe(userData),
    onSuccess: () => {
      toast.success("REcipe Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook using useInfiniteQuery for infinite scrolling
export const useGetAllRecipe = (searchTerm: string, sort: string) => {
  return useInfiniteQuery({
    queryKey: ['RECIPE', searchTerm, sort],
    queryFn: async({ pageParam }) => await getAllRecipe(pageParam, searchTerm, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      {
        if (lastPage.page + 10 > lastPage.pageCount) {
            return false;
        }
        return lastPage.page + 10;
    }
    },
    getPreviousPageParam: (firstPage) => {
      const prevPage = firstPage.page - 1;
      return prevPage > 0 ? prevPage : undefined;
    },
  });
};
export const useGetRecipeById = (feedId:string) => {
  return useQuery({
    queryKey: ["RECIPE", feedId],
    queryFn: async () => await getRecipeById(feedId)
  });
};

// Custom hook for upvoting, downvoting , comment and rating
export const useRecipe = () => {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: (recipeId: string) => upvoteRecipe(recipeId),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      if(!res?.success ){
        toast.success(res?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: (recipeId: string) => downvoteRecipe(recipeId),
    onSuccess: (res:any) => {
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      if(!res?.success ){
        toast.success(res?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({recipeId, comment}:{recipeId: string, comment:string}) => commentOnRecipe(recipeId, comment),
    onSuccess: (res:any) => {
      console.log(res)
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      toast.success(res?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const rateMutation = useMutation({
    mutationFn: ({recipeId, rate}:{ recipeId: string, rate:number}) => rateRecipe(recipeId, rate),
    onSuccess: (res:any) => {
      console.log(res)
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      toast.success(res?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { upvoteMutation, downvoteMutation, commentMutation, rateMutation };
};




