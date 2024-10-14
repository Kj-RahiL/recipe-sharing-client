"use client";
import { ArrowLeftFromLine } from "lucide-react";
import error from "../../public/animation/Error.json";
import Link from "next/link";
import dynamic from "next/dynamic";
// Load Lottie dynamically to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const NotFoundPage = () => {
  return (
    <div className=" min-h-screen">
      <div className=" text-center text-gray-400 flex justify-center items-center">
        <div className="max-w-md">
          <Lottie animationData={error}></Lottie>
          <p className="mb-5 font-semibold text-2xl">Page Not Found</p>
          <Link href="/" className="flex justify-center items-center">
            <button className="px-3 py-2 rounded-sm text-white hover:text-black bg-[#d52424] flex items-center text-center">
              <ArrowLeftFromLine />
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
