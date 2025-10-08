"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuUserRoundPlus } from "react-icons/lu";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from "next/navigation";
import { refetchAnalytics } from "lib/useAnalyticsQuery";
import { useSelector } from "react-redux";

export default function Page() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isShow, setIsShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const themeMode = useSelector((state) => state.themeToggle.mode);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { fullname, email, password } = data;
      const userData = { fullname, email, password, photoUrl: "https://res.cloudinary.com/dloasaxt1/image/upload/v1759951379/User_Avatar_abmwcj.png" };

      const res = await axios.post("/api/register", userData);
      setLoading(false);
      if (res.status === 201) router.push('/login');
      setMessage(res.data.message);
    }
    catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const bgPage = themeMode === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 via-white to-blue-50";
  const cardBg = themeMode === "dark" ? "bg-gray-800" : "bg-base-100";
  const textPrimary = themeMode === "dark" ? "text-gray-400" : "text-gray-900";
  const textSecondary = themeMode === "dark" ? "text-gray-600" : "text-gray-600";

  const inputClass = themeMode === "dark" ? "bg-gray-800 text-gray-400 border-gray-700" : "";

  return (
    <div className={`${bgPage} mt-18 min-h-screen pb-6`}>
      <div className="text-center pt-5">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl">
          <LuUserRoundPlus className="text-2xl text-white" />
        </div>
        <h2 className={`text-4xl font-bold mb-3 ${textPrimary}`}>Create Account</h2>
        <p className={`text-lg ${textSecondary}`}>Join our community of readers and writers</p>
      </div>

      <div className={`max-w-md mx-auto p-6 ${cardBg} rounded-lg shadow-md`}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className={`label-text ${textSecondary}`}>Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className={`border border-gray-300 input w-full ${inputClass}`}
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className={`label-text ${textSecondary}`}>Email Address</span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`input border border-gray-300 w-full ${inputClass}`}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className={`label-text ${textSecondary}`}>Password</span>
            </label>
            <div className="relative z-2 w-full">
              <input
                type={isShow ? "text" : "password"}
                placeholder="Create a strong password"
                className={`input border border-gray-300 w-full pr-10 ${inputClass}`}
                {...register("password", { required: true, minLength: 6 })}
              />
              <button type="button" onClick={() => setIsShow(!isShow)} className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500">Password must be at least 6 characters</p>}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">
              <span className={`label-text ${textSecondary}`}>Confirm Password</span>
            </label>
            <div className="relative z-2 w-full">
              <input
                type={isConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className={`input border border-gray-300 w-full pr-10 ${inputClass}`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <button type="button" onClick={() => setIsConfirm(!isConfirm)} className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {isConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className={`cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium ${loading && "opacity-50 cursor-not-allowed"}`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className={`${themeMode === 'dark' ? 'text-gray-300' : 'text-primary'} divider`}>Or sign up with</div>

          <button onClick={() => signIn("google", { callbackUrl: "/" })} type="button" className={`${themeMode === 'dark' ? 'text-white hover:bg-gray-900 hover:shadow-none' : 'text-primary'} btn-outline btn border-2 border-blue-400 w-full`}>
            <AiFillGooglePlusCircle className="text-[#ff5059] text-xl" /> Google
          </button>

          <div className={`text-center text-sm mt-2 ${textSecondary}`}>
            Already have an account?{" "}
            <Link href="/login" className={`${themeMode === 'dark' ? 'text-gray-300' : 'text-primary'} hover:underline`}>
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

