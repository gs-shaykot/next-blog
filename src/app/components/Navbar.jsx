"use client"
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { TbLogin2 } from "react-icons/tb";
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri";
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSunnyOutline } from "react-icons/io5";
import { toggleTheme } from '@/app/Redux/slice';
import { usePathname } from 'next/navigation';

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
});

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userDtl = session?.user;
    const themeMode = useSelector((mode) => mode.themeToggle.mode);
    const dispatch = useDispatch();

    const NavItems = () => {
        const links = [
            { href: "/", label: "Home" },
            { href: "/blogs", label: "Blogs" },
            { href: "/categories", label: "Categories" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
        ];

        return (
            <>
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`relative font-semibold transition-colors ${pathname === href
                                ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
                                : "hover:text-blue-500"
                                }`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </>
        );
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 py-1 transition-all duration-300 border-b border-gray-200 ${themeMode === "dark"
                ? "bg-gray-900 !text-white"
                : "bg-white !text-black"
                } ${isScrolled ? "shadow-md !py-0" : "shadow-none"} bg-base-100`}
        >
            <div className="!max-w-6xl mx-auto navbar">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* mobile menu dropdown */}
                    <div className="dropdown lg:hidden">
                        ...
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex text-2xl font-bold">
                        <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dloasaxt1/image/upload/v1758462042/feather-pen_pdmaq4.png"
                            alt="feather pen with ink pot"
                        />
                        BlogCraft
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex ml-10">
                        <ul className="menu menu-horizontal px-1">
                            <NavItems />
                        </ul>
                    </div>
                </div>

                <div className="navbar-end flex gap-2">
                    <label
                        className={`input rounded-lg mr-2 hidden lg:flex ${themeMode === "dark" ? "bg-gray-800 !text-white" : "bg-white !text-black"
                            }`}
                    >
                        <CiSearch className="text-lg" />
                        <input
                            type="search"
                            required
                            placeholder="Search"
                            className={`bg-transparent outline-none ${themeMode === "dark" ? "placeholder-gray-400" : "placeholder-gray-600"
                                }`}
                        />
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
                                className={`menu menu-sm dropdown-content  ${themeMode === "dark" ? "bg-gray-900 !text-white" : "bg-white !text-black"} rounded-box z-1 mt-3 w-52 p-2 shadow`}
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
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="synthwave" />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-8 w-8 fill-current"
                            onClick={() => dispatch(toggleTheme())}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-8 w-8 fill-current"
                            onClick={() => dispatch(toggleTheme())}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    );
}
