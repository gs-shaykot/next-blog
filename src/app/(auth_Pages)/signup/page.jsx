"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuUserRoundPlus } from "react-icons/lu";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { signIn } from 'next-auth/react';

export default function Page() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isShow, setIsShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const file = data.photo[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const Img_Res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageLink = Img_Res.data.secure_url;

      const { fullname, email, password } = data;

      const userData = {
        fullname,
        email,
        password,
        photoUrl: imageLink,
      };
      const res = await axios.post("/api/register", userData);

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 mt-18">
      <div className="text-center pt-5">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl">
          <LuUserRoundPlus className="text-2xl text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Create Account</h2>
        <p className="text-gray-600 text-lg">Join our community of readers and writers</p>
      </div>

      <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className="input input-bordered w-full"
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative z-2 w-full">
              <input
                type={isShow ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="Create a strong password"
                {...register("password", { required: true, minLength: 6 })}
              />
              <button
                type="button"
                onClick={() => setIsShow(!isShow)}
                className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500">Password must be at least 6 characters</p>}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="relative z-2 w-full">
              <input
                type={isConfirm ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setIsConfirm(!isConfirm)}
                className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {isConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Upload Photo */}
          <div>
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              {...register("photo", { required: "Profile photo is necessary" })}
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="divider">Or sign up with</div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="btn btn-outline w-full">
            <AiFillGooglePlusCircle className="text-[#ff5059] text-xl" />
            Google
          </button>


          <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
