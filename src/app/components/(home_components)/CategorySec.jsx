import React from 'react'
import catBgc from '../../../../public/catBgc.jpg';
import { FaCode, FaRegHeart, FaMapMarkedAlt } from "react-icons/fa";
import { LiaPaletteSolid } from "react-icons/lia";
import { LuBriefcaseBusiness } from "react-icons/lu";

export default function CategorySec({ categories }) {
    console.log(categories)
    return (
        <section className='py-5 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden mt-10'>
            <div>
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${catBgc.src})` }}
                    aria-hidden="true"
                />
                <div className='absolute inset-0 bg-black/60' aria-hidden="true" />
                <div className="relative z-10 text-center my-5">
                    <div className="inline-block">
                        <h2 className="text-5xl md:text-6xl font-bold mb-1 text-white">Featured Stories</h2>
                        <div className="h-1 w-36 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full animate-pulse" />
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-3 leading-relaxed">
                        Discover content across different topics and interests
                    </p>
                </div>
            </div>
            <div className='relative z-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4'>

                {
                    categories.map((category, idx) => (
                        <div
                            key={idx}
                            className="group glass transition-all rounded-lg transition transform duration-300 md:hover:scale-108 flex flex-col place-items-center text-center"
                        >
                            <div className='p-5'>
                                <div className="icons">
                                    {
                                        idx === 0 && <FaCode className='w-16 h-16 text-white bg-[#3b82f6] p-4 rounded-xl mb-2 group-hover:rotate-12  transition-all' /> ||
                                        idx === 1 && <LiaPaletteSolid className='w-16 h-16 text-white bg-[#a855f7] p-4 rounded-xl mb-2 group-hover:rotate-12  transition-all ' /> ||
                                        idx === 2 && <FaRegHeart className='w-16 h-16 text-white bg-[#22c55e] p-4 rounded-xl mb-2 group-hover:rotate-12  transition-all ' /> ||
                                        idx === 3 && <LuBriefcaseBusiness className='w-16 h-16 text-white bg-[#f97316] p-4 rounded-xl mb-2 group-hover:rotate-12  transition-all ' /> ||
                                        idx === 4 && <FaMapMarkedAlt className='w-16 h-16 text-white bg-[#ef4444] p-4 rounded-xl mb-2 group-hover:rotate-12  transition-all ' />
                                    }
                                </div>
                                <h1 className='font-bold text-lg text-white'>{category.name}</h1>
                                <h1 className='text-white'>{category.count} articles</h1>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section >
    )
}
