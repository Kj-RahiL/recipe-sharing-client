/* eslint-disable @typescript-eslint/no-explicit-any */

import { createRecipe, downvoteRecipe, getAllRecipe, upvoteRecipe } from "@/services/RecipeService";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["RECIPE"],
    queryFn: async () => await getAllRecipe()
  });
};

// Custom hook for upvoting and downvoting
export const useVoteRecipe = () => {
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: (recipeId: string) => upvoteRecipe(recipeId),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      toast.success(res?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const downvoteMutation = useMutation({
    mutationFn: (recipeId: string) => downvoteRecipe(recipeId),
    onSuccess: (res:any) => {
      queryClient.invalidateQueries({queryKey: ["RECIPE"]});
      toast.success(res?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { upvoteMutation, downvoteMutation };
};

