/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";

export const getAllUsers = async () => {
  const { data } = await nexiosInstance.get(`/user`, {
    cache: "no-store",
  });
  return data;
};
export const getSingleUser = async (id:string) => {
  const { data } = await nexiosInstance.get(`/user/${id}`, {
    cache: "no-store",
  });
  return data;
};
export const followUser = async (followData: any) => {
  const { data } = await nexiosInstance.post(`/user/follow`, followData, {
    cache: "no-store",
  });
  console.log(data, "followUser");
  return data;
};
export const unFollowUser = async (followData:any) => {
  const { data } = await nexiosInstance.post(`/user/unFollow`, followData, {
    cache: "no-store",
  });
  console.log(data, 'unfollow');
  return data;
};


// Delete a user
export const deleteUser = async (id: string) => {
    try {
      await nexiosInstance.delete(`/users/${id}`, {
        cache: "no-store",
      });
      console.log(`Deleted user: ${id}`);
    } catch (error) {
      console.error(`Failed to delete user with ID: ${id}`, error);
      throw error;
    }
  };
  
  // Update user status (e.g., from 'in-progress' to 'block')
  export const updateUserStatus = async (id: string, payload: any) => {
    try {
      const { data } = await nexiosInstance.put(`/users/${id}`, payload, {
        cache: "no-store",
      });
      console.log(`Updated user status: ${id}`, data);
      return data;
    } catch (error) {
      console.error(`Failed to update user status with ID: ${id}`, error);
      throw error;
    }
  };