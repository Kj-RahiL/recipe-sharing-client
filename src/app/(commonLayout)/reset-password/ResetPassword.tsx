/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Input } from "@nextui-org/react";
import { Lock, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import bgLogin from "../../../../public/assets/recipe2.jpg";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/AuthService";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const router = useRouter()

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const res = await resetPassword(token!, email!, confirmPassword);
      console.log(res);
        if (res?.success) {
          toast.success(res.message);
          router.push('/login')
        } else {
          toast.error(res?.message || "Password change failed.");
        }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <div
      className="  min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLogin.src})` }}
    >
      <div className="p-8 backdrop-blur-lg w-3/4 lg:w-1/3 md:2/4  mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font font-medium py-4 text-white">
          Reset Password
        </h2>
        <form className="space-y-4 text-white" onSubmit={handleChangePassword}>
          {/* Current Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              type="password"
              variant="underlined"
              label="New Password"
              name="newPassword"
              placeholder="Enter New password"
              className="pl-10 text-white"
              required
            />
          </div>

          {/* New Password Input */}
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              type="password"
              variant="underlined"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter Confirm password"
              className="pl-10"
              required
            />
          </div>
          <Button className="btn button-bg w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
