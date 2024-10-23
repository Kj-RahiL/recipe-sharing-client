/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { followUser, getAllUsers, getSingleUser, unFollowUser } from "@/services/UsersService";
import { UserResponse } from "@/types";
import { useMutation, useQuery  } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


export const useUserFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_FOLLOW"],
    mutationFn: async (userData) => await followUser(userData),
    onSuccess: () => {
      toast.success("Following user");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserUnFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_UNFOLLOW"],
    mutationFn: async (userData) => await unFollowUser(userData),
    onSuccess: () => {
      toast.success("unFollow User");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSingleUser = (id: string) => {
  return useQuery<UserResponse, Error>({
    queryKey: ["SINGLE_USER", id], 
    queryFn: async () => {
      const response = await getSingleUser(id); 
      return response as UserResponse; 
    },
  });
};
export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["ALL_USER"],
    queryFn: async () => await getAllUsers()
  });
};
// export const useGetAllUser = () => {
//     return useQuery<any[], Error>({
//       queryKey: ["ALL_USER"],
//       queryFn: async () => {
//         const users = await getAllUsers();
//         // Filter non-admin users if needed
//         return users;
//       },
//       onError: (error: any) => {
//         toast.error(`Error fetching users: ${error.message}`);
//       },
//     });
//   };