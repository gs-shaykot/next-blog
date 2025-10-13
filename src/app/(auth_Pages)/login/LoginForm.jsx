"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiFillGooglePlusCircle } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbLogin2 } from "react-icons/tb";
import { useSelector } from 'react-redux';
export default function LoginForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeMode = useSelector((state) => state.themeToggle.mode);

  const rebackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (email, password) => {
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.ok) router.push(rebackUrl);
    else alert("Invalid credentials");
  };

  const onSubmit = async (data) => {
    await handleLogin(data.email, data.password);
  };

  const loginAsAdmin = async () => {
    const email = "shaykotkhan1916@gmail.com";
    const password = "123456";
    setValue("email", email);
    setValue("password", password);
    await handleLogin(email, password);
  };

  return (
    <div
      className={`mt-18 min-h-screen ${themeMode === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
        }`}
    >
      {/* Header */}
      <div className="text-center pt-5">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl">
          <TbLogin2 className="text-2xl text-white" />
        </div>
        <h2
          className={`text-4xl font-bold mb-3 ${themeMode === "dark" ? "text-gray-400" : "text-gray-900"
            }`}
        >
          Welcome Back
        </h2>
        <p
          className={`text-lg ${themeMode === "dark" ? "text-gray-500" : "text-gray-600"
            }`}
        >
          Sign in to your account to continue reading
        </p>
      </div>

      {/* Form Card */}
      <div
        className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${themeMode === "dark" ? "bg-gray-800" : "bg-base-100"
          }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span
                className={`label-text ${themeMode === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
              >
                Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`input border border-gray-300 w-full ${themeMode === "dark"
                  ? "bg-gray-800 text-gray-300 border-gray-700"
                  : "bg-white text-gray-800"
                }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span
                className={`label-text ${themeMode === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
              >
                Password
              </span>
            </label>
            <div className="relative z-2 w-full">
              <input
                type={isShow ? "text" : "password"}
                placeholder="Enter your password"
                className={`input border border-gray-300 w-full pr-10 ${themeMode === "dark"
                    ? "bg-gray-800 text-gray-300 border-gray-700"
                    : "bg-white text-gray-800"
                  }`}
                {...register("password", { required: true, minLength: 6 })}
              />
              <button
                type="button"
                onClick={() => setIsShow(!isShow)}
                className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            type="submit"
            className={`cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium ${loading && "opacity-50 cursor-not-allowed"
              }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Admin Login */}
          <button
            type="button"
            onClick={loginAsAdmin}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${themeMode === "dark"
                ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            Login as Admin
          </button>

          {/* Divider */}
          <div
            className={`divider ${themeMode === "dark" ? "text-gray-300" : "text-primary"
              }`}
          >
            Or Log in with
          </div>

          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className={`btn-outline btn border-2 border-blue-400 w-full flex items-center justify-center gap-2 ${themeMode === "dark"
                ? "text-white hover:bg-gray-900 hover:shadow-none"
                : "text-primary"
              }`}
          >
            <AiFillGooglePlusCircle className="text-[#ff5059] text-xl" /> Google
          </button>

          {/* Register link */}
          <div
            className={`text-center text-sm mt-2 ${themeMode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Don't have an account?{" "}
            <Link
              href="/signup"
              className={`hover:underline ${themeMode === "dark" ? "text-gray-300" : "text-blue-600"
                }`}
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}