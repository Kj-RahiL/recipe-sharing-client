/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers";
import nexiosInstance from "@/config/nexios.config";
import { revalidateTag } from "next/cache";

interface PaymentResponse {
    payment_url: string;
    result: boolean;
  }

export const createPayment = async (paymentData: any) => {
    const token = cookies().get("accessToken")?.value;
    try {
      const {data} = await nexiosInstance.post<PaymentResponse>(`/order`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        }
      });
      revalidateTag("PAYMENT")
      return data
    } catch (error) {
      console.error("failed to payment", error);
      throw error;
    }
  };