/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import bgLogin from "../../../../public/assets/recipe2.jpg";
import loginAni from "../../../../public/animation/Animation - 1701011933091.json";
import Lottie from "lottie-react";
import nexiosInstance from "@/config/nexios.config";
import { toast } from "sonner";
import { verifyToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/AuthService";

const LoginFrom = () => {
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userInfo = {
      email: form.email.value,
      password: form.password.value,
    };
    const toastId = toast.loading("Logging in");
    try {
     const res = await loginUser(userInfo)
     console.log(res)
      if (!(res?.success)) {
        throw new Error(res?.message || "Failed to login user" );
      }else{
        toast.success(res?.message || "Logged In Successful", { id: toastId, duration: 4000 });
        router.push(`/`);
      }
    } catch (error: any) {
      toast.error(error?.message || "login failed", {
        id: toastId,
        duration: 4000,
        style: { color: "red" },
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin.src})` }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl p-8  backdrop-blur-md">
        {/* Lottie animation section */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <Lottie animationData={loginAni} className="w-full" />
        </div>

        {/* Form section with wider width */}
        <div className="w-full lg:w-2/3 p-8 rounded border border-gray-500/30 shadow">
          <form onSubmit={handleLogin} className="space-y-4">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              Login now!
            </h1>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="text-[#13ffaa] label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="button text-white w-full">Login</button>
            </div>

            {/* Signup Link */}
            <div className="text-center mt-4">
              <p className="text-gray-200">
                New here?{" "}
                <Link href="/register" className="text-[#13ffaa] font-semibold">
                  Create a new account
                </Link>
              </p>
            </div>

            {/* Divider and Social Login */}
            <div className="text-center mt-6">
              <div className="divider text-gray-200">OR</div>
              <p className="text-gray-200">Social login options will go here</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
