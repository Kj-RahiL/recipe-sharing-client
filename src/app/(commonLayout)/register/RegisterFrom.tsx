/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import bgLogin from "../../../../public/assets/recipe2.jpg";
import Link from "next/link";

const RegisterFrom = () => {
  // const dispatch = useAppDispatch();
  // const [signUp, { isLoading, error }] = useSignUpMutation();
  // const [login] = useLogInMutation();
  // console.log({ error });
  // const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Signing up...");

    // try {
    //   dispatch(logOut());
    //   const response = await signUp(data).unwrap();
    //   console.log(response);

    //   toast.success(response.message, {
    //     id: toastId,
    //     duration: 4000,
    //     style: { color: "green" },
    //   });
    //   navigate("/");

    //   // login
    //   const userInfo = {
    //     email: data.email,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const token = res.token.split(" ")[1];
    //   const user = verifyToken(token);
    //   dispatch(setUser(data));

    //   dispatch(setLoginUser({ user, token }));
    // } catch (err: any) {
    //   toast.error(`Error: ${err.data.message || "Sign-up failed"}`, {
    //     id: toastId,
    //     duration: 4000,
    //     style: { color: "red" },
    //   });
    //   console.log({ err });
    // }
  };

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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13ffaa]"
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
