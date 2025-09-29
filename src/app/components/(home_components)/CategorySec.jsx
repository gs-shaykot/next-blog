"use client"
import React from 'react'
import catBgc from '../../../../public/catBgc.jpg';
import { FaCode, FaRegHeart, FaMapMarkedAlt, FaLongArrowAltRight } from "react-icons/fa";
import { LiaPaletteSolid } from "react-icons/lia";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { useSelector } from 'react-redux';

export default function CategorySec({ categories }) {
    const themeMode = useSelector((mode) => mode.themeToggle.mode)
    return (
        <section className='py-5 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden '>
            <div>
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${catBgc.src})` }}
                    aria-hidden="true"
                />
                <div className='absolute inset-0 bg-black/80' aria-hidden="true" />
                <div className="relative z-10 text-center my-5">
                    <div className="inline-block">
                        <h2
                            className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-gray-300 bg-clip-text text-transparent `}
                        >
                            Explore Categories
                        </h2>
                        <div className="h-1 w-36 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-3 leading-relaxed">
                        Discover content across different topics and interests
                    </p>
                </div>
            </div>
            <div className='relative z-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4'>
                {categories.map((category, idx) => (
                    <a
                        key={idx}
                        href="#"
                        className="group cursor-pointer transform hover:scale-110 transition-all duration-500"
                    >
                        <div
                            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 border border-white/20 hover:border-blue-400/50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                    {idx === 0 && <FaCode className="w-full h-full text-white bg-[#3b82f6] p-3 rounded-xl" />}
                                    {idx === 1 && <LiaPaletteSolid className="w-full h-full text-white bg-[#a855f7] p-3 rounded-xl" />}
                                    {idx === 2 && <FaRegHeart className="w-full h-full text-white bg-[#22c55e] p-3 rounded-xl" />}
                                    {idx === 3 && <LuBriefcaseBusiness className="w-full h-full text-white bg-[#f97316] p-3 rounded-xl" />}
                                    {idx === 4 && <FaMapMarkedAlt className="w-full h-full text-white bg-[#ef4444] p-3 rounded-xl" />}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    {category.name}
                                </h3>

                                <p className="text-gray-300 text-sm">{category.count} articles</p>

                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="inline-flex place-items-center items-center justify-center text-blue-300 text-sm">
                                        Explore <FaLongArrowAltRight className="mt-1 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}


            </div>
        </section >
    )
}
