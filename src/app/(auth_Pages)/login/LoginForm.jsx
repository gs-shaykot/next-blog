"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiFillGooglePlusCircle } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { TbLogin2 } from "react-icons/tb";

export default function LoginForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const rebackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (data) => {
        const { email, password } = data
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (res?.ok) {
            router.push(rebackUrl);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 mt-18">
            <div className="text-center pt-5">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                    <TbLogin2 className="text-2xl text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h2>
                <p className="text-gray-600 text-lg">Sign in to your account to continue reading</p>
            </div>

            <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className={`cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium ${loading && "opacity-50 cursor-not-allowed"}`}
                    >
                        {loading ? "Logging up..." : "Log In"}
                    </button>

                    <div className="divider">Or Log in with</div>

                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        type="button"
                        className="btn btn-outline w-full">
                        <AiFillGooglePlusCircle className="text-[#ff5059] text-xl" />
                        Google
                    </button>

                    <div className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary hover:underline">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
