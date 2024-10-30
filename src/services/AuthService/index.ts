/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import nexiosInstance from "@/config/nexios.config";
import { LoginResponse, RegisterResponse } from "@/types";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async (userData: any) => {
  const { data } = await nexiosInstance.post<RegisterResponse>(
    "/auth/register",
    userData
  );
  revalidateTag('Users')
  if (!data.success) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

export const loginUser = async (userData: any) => {
  const { data } = await nexiosInstance.post<LoginResponse>(
    "/auth/login",
    userData,
    {
      next: { tags: ["Login"] },
    }
  );
  revalidateTag('Users')
  if (!data?.success) {
    throw new Error(data?.message || "LOgin failed");
  }
  if (data?.success) {
    cookies().set("accessToken", data.token!);
    revalidateTag("Login");
    return data;
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }
  return {
    id: decodedToken?.id,
    name: decodedToken?.name,
    email: decodedToken?.email,
    image: decodedToken?.image,
    role: decodedToken?.role,
    bio: decodedToken?.bio,
    followers: decodedToken?.followers,
    following: decodedToken?.following,
    status: decodedToken?.status,
    isPaid: decodedToken?.isPaid
  };
};

export const getNewAccessToken = async (): Promise<LoginResponse> => {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const res = await nexiosInstance.post<LoginResponse>(
    "/auth/refresh-token",
    {},
    {
      withCredentials: true,
      headers: {
        Cookie: `refreshToken=${refreshToken}`, // Setting the refresh token as a cookie
      },
    }
  );

  // Save the new access token after refreshing
  cookies().set("accessToken", res.data.token!, { httpOnly: true });

  return res.data; // Now this should be recognized as LoginResponse
};

export const changePassword = async(newFormData: any) => {
  const token = cookies().get("accessToken")?.value;
  // console.log("tok", {token})
  const {data} = await nexiosInstance.post("/auth/change-password", newFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Optional: Specify content type
    },
  });
  revalidateTag("Users");

  // console.log(data)
  // if (!data.success) {
  //   throw new Error(data.message || "Change Password failed");
  // }
  return data;

};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};




