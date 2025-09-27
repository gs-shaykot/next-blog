"use client"
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { CiSearch } from "react-icons/ci";
import { TbLogin2 } from "react-icons/tb";
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri";
import { signOut, useSession } from 'next-auth/react';
const pacifico = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
});

export default function Navbar() {
    const { data: session } = useSession();
    const userDtl = session?.user;

    const NavItems = () => (
        <>
            <li><Link href="/" className="font-semibold">Home</Link></li>
            <li><Link href="/" className="font-semibold">Blog</Link></li>
            <li><Link href="/" className="font-semibold">Categories</Link></li>
            <li><Link href="/" className="font-semibold">About</Link></li>
            <li><Link href="/" className="font-semibold">Contact</Link></li>
        </>
    );

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="!max-w-6xl mx-auto navbar !py-1">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <NavItems />
                            <li className="lg:hidden">
                                <label className="input input-sm rounded-lg mb-2">
                                    <CiSearch className="text-lg" />
                                    <input type="search" required placeholder="Search" />
                                </label>
                            </li>
                            {!userDtl && (
                                <>
                                    <li className="lg:hidden">
                                        <Link href="/login">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 !text-sm !w-full"
                                            >
                                                <TbLogin2 />
                                                Login
                                            </button>
                                        </Link>
                                    </li>
                                    <li className="lg:hidden">
                                        <Link href="/signup">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded-lg border-2 border-blue-600 text-blue-600 bg-blue-600 text-white px-3 py-1.5 !text-sm !w-full mt-2"
                                            >
                                                <RiUserAddLine />
                                                Sign up
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link href="/" className={`flex text-2xl font-bold ${pacifico.className} text-black`}>
                        <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dloasaxt1/image/upload/v1758462042/feather-pen_pdmaq4.png"
                            alt="feather pen with ink pot"
                        />
                        BlogCraft
                    </Link>

                    <div className="hidden lg:flex ml-10">
                        <ul className="menu menu-horizontal px-1">
                            <NavItems />
                        </ul>
                    </div>
                </div>

                <div className="navbar-end flex gap-2">
                    <label className="input rounded-lg mr-2 hidden lg:flex">
                        <CiSearch className="text-lg" />
                        <input type="search" required placeholder="Search" />
                    </label>

                    {userDtl ? (
                        <div className="dropdown dropdown-end mt-1">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="rounded-full">
                                    <Image
                                        width={40}
                                        height={40}
                                        alt="User avatar"
                                        src={userDtl?.image}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li><Link href="/profile">Profile</Link></li>
                                <li><Link href="/settings">Settings</Link></li>
                                <li>
                                    <button onClick={() => signOut()}>Sign out</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-2">
                            <Link href="/login">
                                <button
                                    type="button"
                                    className="flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 !text-xs"
                                >
                                    <TbLogin2 />
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button
                                    type="button"
                                    className="flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded-lg border-2 border-blue-600 text-blue-600 bg-blue-600 text-white px-3 py-1.5 !text-xs"
                                >
                                    <RiUserAddLine />
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}