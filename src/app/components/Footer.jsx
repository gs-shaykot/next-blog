"use client"
import { Pacifico } from 'next/font/google';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React from 'react'

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: ['400'],
});

export default function Footer() {
    const pathname = usePathname()
    if (!pathname.includes('AdminDashboard'))
        return (
            <div className=''>
                <footer className="footer sm:footer-horizontal bg-gray-800 text-white p-10">
                    <aside>
                        <Image
                            width={60}
                            height={60}
                            src="https://res.cloudinary.com/dloasaxt1/image/upload/v1758462042/feather-pen_pdmaq4.png"
                            alt="feather pen with ink pot"
                        />
                        <p>
                            <span className={`${pacifico.className} text-2xl/10 mb-3`}>BlogCraft</span>
                            <br />
                            Providing reliable tech blogs since 2017
                        </p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Quick Links</h6>
                        <a className="link link-hover">Home</a>
                        <a className="link link-hover">Blog</a>
                        <a className="link link-hover">Categories</a>
                        <a className="link link-hover">Aboud</a>
                        <a className="link link-hover">Contact</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Categories</h6>
                        <a className="link link-hover">Technology</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Business</a>
                        <a className="link link-hover">Lifestyle</a>
                        <a className="link link-hover">Travel</a>
                    </nav>
                    <div>
                        <h3 className="text-lg font-semibold">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-2">Subscribe to our newsletter for the latest posts and updates.</p>
                        <div className="space-y-2">
                            <input placeholder="Enter your email" className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" type="email" />
                            <button className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        )
}
