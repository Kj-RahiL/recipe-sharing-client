/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createPayment } from "@/services/PaymentService";
import { toast } from "sonner";



export const PlanCard = ({ title, price, duration, features, bgColor, hoverColor }: any) => {
    const handleProceedToPay = async (price:string, duration:string) => {
        console.log({price, duration})
        const paymentData = {
            price: Number(price), 
            duration
        }
          try {
            const response = await createPayment(paymentData )
            window.location.href = response?.payment_url;
            console.log(response)
          } catch (error:any) {
            toast.error(error.data?.message || 'Booking failed. Please try again.');
          }
    
      };
  return (
    <div
      className={`relative flex flex-col justify-between w-full max-w-md rounded-xl 
        border border-gray-300 drop-shadow-sm shadow-sm shadow-emerald-950 p-10 bg-white dark:bg-gray-900 
        dark:border-gray-700 transition-transform hover:scale-105`}
    >
      <div>
        <h2
          className="text-center text-3xl font-semibold mb-4 tracking-widest 
          text-gray-700 dark:text-gray-200"
        >
          {title}
        </h2>
        <div className="flex justify-center items-center mb-6">
          <span className="text-4xl font-bold">$</span>
          <h1 className="text-6xl font-extrabold">{price}</h1>
          <span className="text-xl font-medium self-end">/plan</span>
        </div>
        <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
          {features.map((feature: any, index:any) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-green-500">&#10003;</span> {feature}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleProceedToPay(price, duration)}
        className={`w-full py-4 mt-8 text-lg font-semibold text-white ${bgColor} 
          rounded-md ${hoverColor} transition-all duration-300`}
        style={{ height: "56px" }}
      >
        Join Now
      </button>
      <button 
        className={`w-full py-4 mt-8 text-lg font-semibold text-white 
          rounded-md button-bg transition-all duration-300`}
        style={{ height: "56px" }}
      >
        button-standings
      </button>
    </div>
  );
};

