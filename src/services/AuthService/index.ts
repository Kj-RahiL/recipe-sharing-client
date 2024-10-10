/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { verifyToken } from "@/app/utils/verifyToken";
import nexiosInstance from "@/config/nexios.config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const registerUser = async (userData: any) => {
  const { data } = await nexiosInstance.post("/auth/register", userData);
  return data;
};

export const loginUser = async (userData: any) => {
  const { data } = await nexiosInstance.post("/auth/login", userData);
  if (data?.success) {
    cookies().set("accessToken", data?.token, { httpOnly: true });
    return data;
  }
};

export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;
  
    if (accessToken) {
      decodedToken = await jwtDecode(accessToken);}
  return {
    id: decodedToken.id,
    name: decodedToken.name,
    email: decodedToken.email,
    image: decodedToken.image,
    role: decodedToken.role,
    status: decodedToken.status,
  }
};

export const getNewAccessToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const res = await nexiosInstance.post(
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
  cookies().set("accessToken", res.data.accessToken, { httpOnly: true });

  return res.data;
};

export const logout = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  };
