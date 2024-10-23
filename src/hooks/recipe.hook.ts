/* eslint-disable @typescript-eslint/no-explicit-any */

import { createRecipe, getAllRecipe } from "@/services/RecipeService";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (userData) => await getAllRecipe(userData),
    onSuccess: () => {
      toast.success("REcipe Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

