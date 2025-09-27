import Link from 'next/link'
import React from 'react'
import { FiBookOpen } from "react-icons/fi";
import { GiFeather } from "react-icons/gi";

export default function Banner() {
    return (
        <section
            className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(30, 64, 175, 0.9), rgba(55, 65, 81, 0.8)), url("https://res.cloudinary.com/dloasaxt1/image/upload/v1758538560/7472e3205063d5e8003bca47d4c4b781_blgerc.jpg")`,
            }}
        >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-gray-800/20 to-slate-900/20 animate-pulse" />

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-30 animate-bounce" />
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full blur-lg opacity-40 animate-pulse" />
                <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-600 to-slate-700 rounded-full blur-lg opacity-35 animate-bounce delay-300" />
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-indigo-500 to-gray-600 rounded-full blur-xl opacity-25 animate-pulse delay-700" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <div className="animate-fade-in-up">
                    {/* Heading */}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight">
                        Craft Your{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-slate-400 bg-clip-text text-transparent animate-gradient">
                            Story
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base sm:text-lg md:text-2xl mb-8 sm:mb-12 max-w-2xl md:max-w-4xl mx-auto leading-relaxed opacity-90 animate-fade-in-up delay-300">
                        Discover inspiring stories, expert insights, and creative content that sparks
                        imagination and drives innovation in the digital age.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up delay-500">
                        <Link href="">
                            <button
                                type="button"
                                className="flex gap-2 items-center justify-center font-medium text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 text-white w-full sm:w-auto"
                            >
                                <FiBookOpen className="text-lg sm:text-xl" />
                                Explore Blog
                            </button>
                        </Link>
                        <button
                            type="button"
                            className="flex gap-2 items-center justify-center font-medium text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto"
                        >
                            <GiFeather className="text-lg sm:text-xl" />
                            Start Writing
                        </button>
                    </div>
                </div>
            </div>


            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}
