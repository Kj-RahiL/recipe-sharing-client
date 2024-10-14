/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";

export const getAllUsers = async () => {
  const { data } = await nexiosInstance.get(`/user`, {
    cache: "no-store",
  });
  console.log(data);
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