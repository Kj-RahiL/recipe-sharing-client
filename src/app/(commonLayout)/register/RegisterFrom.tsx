/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { logout, registerUser } from "@/services/AuthService";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import bgLogin from "../../../../public/assets/recipe2.jpg";
import Link from "next/link";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import NormalLoading from "../components/Loading/NormalLoading";
import { useRouter } from "next/navigation";
const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegisterFrom = () => {
  const router = useRouter()
  const { mutate: handleUserLogin, isPending } = useUserLogin();
  const { setIsLoading: userLoading } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const toastId = toast.loading("Signing up...");
    await logout();
    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resData = await response.json();

      if (resData.success) {
        const userData: any = {
          name: data.name,
          email: data.email,
          password: data.password,
          image: resData.data.display_url,
          phone: data.phone,
        };
        const response = await registerUser(userData);
        console.log(response);
        if (!response?.success) {
          throw new Error(response?.message || "Registration failed");
        }
        toast.success(response?.message, {
          id: toastId,
          duration: 4000,
          style: { color: "green" },
        });

        // login
        const userInfo = {
          email: data.email,
          password: data.password,
        };
        handleUserLogin(userInfo);
        userLoading(true);
        router.push('/feed')
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message || "Sign-up failed"}`, {
        id: toastId,
        duration: 4000,
        style: { color: "red" },
      });
    }
  };
  
  if(isPending){
    return <NormalLoading/>
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgLogin.src})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-8 ">
        {/* Form section with a consistent design */}
        <div className="w-full lg:w-2/3 p-8  rounded-lg shadow-lg backdrop-blur-md text-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded border border-gray-500/70 shadow p-8 backdrop-blur-xl"
          >
            <h1 className="text-3xl font-bold text-[#13ffaa] mb-4 text-center">
              Register for SP Booking
            </h1>
            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-[#13ffaa] font-semibold">
                Log In
              </Link>
            </p>

            <div className="md:flex gap-4">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
                />
                {errors.name && (
                  <p className="text-red-600" role="alert">
                    Name is required
                  </p>
                )}
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
                />
                {errors.email && (
                  <p className="text-red-600" role="alert">
                    Email is required
                  </p>
                )}
              </div>
            </div>

            <div className="md:flex gap-4">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Your Phone"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
                />
                {errors.phone && (
                  <p className="text-red-600" role="alert">
                    Phone number is required
                  </p>
                )}
              </div>

              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  accept="image/*" // restricts to image files only
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]  "
                />
                {errors.image && (
                  <p className="text-red-600" role="alert">
                    Profile image is required
                  </p>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                type="password"
                placeholder="Your Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa] text-black"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
            </div>

            <div className="form-control pt-4">
              <button className="button w-full">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;
