/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { UserResponse } from "@/types";
import { revalidateTag } from "next/cache";

export const getAllUsers = async () => {
  const { data } = await nexiosInstance.get(`/user`, {
    next: { tags: ["Users"] },
  });
  return data;
};
export const getSingleUser = async (id:string) => {
  const { data } = await nexiosInstance.get<UserResponse>(`/user/${id}`, {
    next: { tags: ["Users"] },
  });
  return data;
};
export const followUser = async (followData: any) => {
  const { data } = await nexiosInstance.post(`/user/follow`, followData,  {
    next: { tags: ["Users"] },
  });
  console.log(data, "followUser");
  // toast.success(data?.message)
  return data;
};
export const unFollowUser = async (followData:any) => {
  const { data } = await nexiosInstance.post(`/user/unFollow`, followData,  {
    next: { tags: ["Users"] },
  });
  // toast.success(data?.message)
  return data;
};


// Delete a user
export const deleteUser = async (id: string) => {
    try {
       const { data } =await nexiosInstance.delete(`/user/${id}`, {
        next: { tags: ["Users"] },
      });
      console.log(`Deleted user: ${id}`, data);
      return data
    } catch (error) {
      console.error(`Failed to delete user with ID: ${id}`, error);
      throw error;
    }
  };
  
  // Update user status (e.g., from 'in-progress' to 'block')
  export const updateUserStatus = async (id: string, payload: any) => {
    try {
      const { data } = await nexiosInstance.put(`/user/${id}`, payload, {
        next: { tags: ["Users"] },
      });
      console.log(`Updated user status: ${id}`, data);
      return data;
    } catch (error) {
      console.error(`Failed to update user status with ID: ${id}`, error);
      throw error;
    }
  };

  export const updateUser = async (id: string, payload: any) => {
    try {
      const { data } = await nexiosInstance.put(`/user/${id}`, payload);
      revalidateTag("Users")
      console.log(`Updated user status: ${id}`, data);
      return data;
    } catch (error) {
      console.error(`Failed to update user status with ID: ${id}`, error);
      throw error;
    }
  };