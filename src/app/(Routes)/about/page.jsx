"use client"
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  FaEye, FaCompass, FaUser, FaNewspaper, FaUsers, FaHeart, FaLightbulb,
  FaSeedling, FaTwitter, FaLinkedinIn, FaEnvelope, FaArrowRight

} from "react-icons/fa";
import Link from 'next/link';

export default function page() {
  const themeMode = useSelector((mode) => mode.themeToggle.mode)

  const valuesData = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We explore cutting-edge ideas and emerging trends to keep our readers ahead of the curve.',
      colorGradient: 'from-yellow-500 to-orange-500',
      delay: '0ms',
    },
    {
      icon: FaHeart,
      title: 'Authenticity',
      description: 'Every story we tell is genuine, backed by research, and written with passion and integrity.',
      colorGradient: 'from-red-500 to-pink-500',
      delay: '150ms',
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'We believe in building connections and fostering meaningful conversations among our readers.',
      colorGradient: 'from-blue-500 to-purple-500',
      delay: '300ms',
    },
    {
      icon: FaSeedling, // Replaces ri-plant-line (Growth/Seedling)
      title: 'Growth',
      description: 'We are committed to continuous learning and helping our community grow personally and professionally.',
      colorGradient: 'from-green-500 to-teal-500',
      delay: '450ms',
    },
  ];

  const statsData = [
    {
      icon: FaUser,
      value: '2M+',
      label: 'Monthly Readers',
    },
    {
      icon: FaNewspaper,
      value: '10K+',
      label: 'Published Articles',
    },
    {
      icon: FaUsers,
      value: '50+',
      label: 'Expert Contributors',
    },
    {
      icon: FaHeart,
      value: '95%',
      label: 'Reader Satisfaction',
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      title: 'Founder & Editor-in-Chief',
      bio: 'Award-winning journalist with 10+ years in digital media. Passionate about storytelling and community building.',
      image: '/p1.jpg', // Path from /public folder
      email: 'sarah@blogcraft.com',
      twitter: '#',
      linkedin: '#',
      delay: '0ms',
    },
    {
      name: 'Marcus Chen',
      title: 'Technology Editor',
      bio: 'Former software engineer turned tech writer. Specializes in emerging technologies and developer culture.',
      image: '/p2.jpg', // Path from /public folder
      email: 'marcus@blogcraft.com',
      twitter: '#',
      linkedin: '#',
      delay: '150ms',
    },
    {
      name: 'Elena Rodriguez',
      title: 'Design & Lifestyle Editor',
      bio: 'Creative director with expertise in visual design and lifestyle trends. Brings artistic perspective to every story.',
      image: '/p3.jpg', // Path from /public folder
      email: 'elena@blogcraft.com',
      twitter: '#',
      linkedin: '#',
      delay: '300ms',
    },
    {
      name: 'David Thompson',
      title: 'Business & Strategy Editor',
      bio: 'MBA and former startup founder. Covers entrepreneurship, business strategy, and market trends.',
      image: '/p4.jpg', // Path from /public folder
      email: 'david@blogcraft.com',
      twitter: '#',
      linkedin: '#',
      delay: '450ms',
    },
  ];

  return (
    <div className={`${themeMode === 'dark' ? '!bg-gray-900' : 'bg-white'} `}>
      {/* banner */}
      <div className="relative w-full h-screen mt-18">
        <Image
          src="/aboutBg.jpg"
          alt="Profile Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80" />

        <div className="absolute inset-0 flex items-center flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-gray-100 bg-clip-text text-transparent">About BlogCraft</h1>
          <p className="text-lg max-w-3xl text-center text-white">We're passionate storytellers, innovative thinkers, and community builders dedicated to sharing knowledge that inspires and empowers.</p>
          <div className='mt-6 flex justify-center gap-3'>
            <button className='font-medium transition-all duration-200 cursor-pointer rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-300 px-3 py-2 text-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300'>Meet Our Team</button>

            <button className='font-medium transition-all duration-200 cursor-pointer rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-300 px-3 py-2 text-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300'>Get in Touch</button>
          </div>
        </div>
      </div>

      {/* our mission */}
      <div className={`${themeMode === 'dark' ? '!bg-gray-900' : 'bg-white'} `}>
        <div className={`py-14 px-5 max-w-7xl mx-auto text-center`}>
          <div className="max-w-3xl inline-block">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                          ${themeMode === "dark"
                  ? "from-white via-blue-400 to-gray-300"
                  : "from-gray-900 via-blue-800 to-slate-800"
                }`}
            >
              Our Mission
            </h2>
            <div className="h-1 w-36 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto rounded-full animate-pulse"></div>
            <p className={`mx-auto text-lg ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} leading-relaxed mb-12 mt-5`}>To democratize knowledge and inspire creativity by delivering high-quality, accessible content that empowers individuals to learn, grow, and make a positive impact in their communities and beyond.</p>

            <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 via-white to-slate-50'} rounded-3xl p-12 shadow-xl border border-gray-100`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-left">
                  <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}  text-2xl font-bold mb-4 flex items-center`}>
                    <FaEye className="ri-eye-line text-blue-600 mr-3" />
                    Our Vision
                  </h3>
                  <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} leading-relaxed`}>To become the world's most trusted platform for thoughtful, well-researched content that bridges the gap between complex ideas and practical application.</p>
                </div>
                <div className="text-left">
                  <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}  text-2xl font-bold mb-4 flex items-center`}>
                    <FaCompass className="ri-compass-line text-slate-600 mr-3" />
                    Our Values
                  </h3>
                  <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} leading-relaxed`}>Integrity, innovation, inclusivity, and impact guide everything we do. We believe in the power of diverse perspectives and collaborative growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-slate-800 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {statsData.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <stat.icon className="text-5xl mb-2 block mx-auto" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* our goal */}
      <div>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                            ${themeMode === "dark"
                    ? "from-white via-blue-400 to-gray-300"
                    : "from-gray-900 via-blue-800 to-slate-800"
                  }`}
              >
                What Drives Us
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
              <p className={`${themeMode === 'dark' ? '!text-gray-400' : 'text-gray-600'} text-xl max-w-3xl mx-auto`}>
                Our core values shape every article we publish and every interaction we have with our community
              </p>
            </div>
            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuesData.map((value, index) => (
                <div
                  key={index}
                  className={`group text-center transform hover:scale-105 transition-all duration-500`}
                  style={{ animationDelay: value.delay }}
                >
                  <div className={`${themeMode === 'dark' ? '!bg-gray-800 !text-white' : 'bg-white'} rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden`}>
                    {/* Hover Background Effect */}
                    <div className={`${themeMode === 'dark' ? '' : 'absolute inset-0 bg-gradient-to-br from-blue-50 /50 via-white to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}></div>
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div className={`w-20 h-20 bg-gradient-to-r ${value.colorGradient} rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                        {/* React Icon Component Replacement */}
                        <value.icon className="text-white text-3xl" />
                      </div>
                      {/* Content */}
                      <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900 '} text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors`}>
                        {value.title}
                      </h3>
                      <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}  leading-relaxed`}>{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section >
      </div>

      {/* our team */}
      <div>
        < section className={`${themeMode === 'dark' ? '!bg-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'} py-24`} >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className={`text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                            ${themeMode === "dark"
                    ? "from-white via-blue-400 to-gray-300"
                    : "from-gray-900 via-blue-800 to-slate-800"
                  }`}
              >
                Meet our Team
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>

              <p className={`${themeMode === 'dark' ? '!text-gray-400' : 'text-gray-600'} text-xl max-w-3xl mx-auto`}>
                Passionate professionals dedicated to creating content that informs, inspires, and empowers
              </p>
            </div>
            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group text-center transform hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: member.delay }}
                >
                  <div className={`${themeMode === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200`}>
                    <div className="relative overflow-hidden">
                      <img
                        alt={member.name}
                        className="w-full h-80 object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                        src={member.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex justify-center space-x-4">
                          <a href={member.twitter} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                          </a>
                          <a href={member.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                          </a>
                          {/* Mail Icon */}
                          <a href={`mailto:${member.email}`} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                            <FaEnvelope /> {/* Replaces ri-mail-line */}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`${themeMode === 'dark' ? 'text-white ' : 'text-gray-900 '} text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors`}>
                        {member.name}
                      </h3>
                      <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-blue-600'} font-semibold mb-4 text-sm`}>
                        {member.title}
                      </p>
                      <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed`}>
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section >
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
                          ${themeMode === "dark"
                    ? "from-white via-blue-400 to-gray-300"
                    : "from-gray-900 via-blue-800 to-slate-800"
                  }`}
              >
                Our Mission
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8"></div>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  **BlogCraft** began in 2019 with a simple idea: the internet needed a place for thoughtful, well-researched content that could bridge the gap between complex topics and everyday understanding.
                </p>
                <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  What started as a small blog has grown into a thriving community of writers, readers, and thinkers from around the world. We've published thousands of articles, sparked countless conversations, and helped millions of people learn something new.
                </p>
                <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-black'}`}>
                  Today, we continue to evolve, embracing new technologies and platforms while staying true to our core mission: creating content that matters.
                </p>
              </div>
 
              <div className="mt-8">
                <Link href='/blogs' > 
                  <button
                    type="button"
                    className="inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer whitespace-nowrap rounded-lg text-white px-6 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 duration-300 focus:ring-4 focus:ring-blue-300"
                  >
                    Read Our Articles
                    <FaArrowRight className="ml-3" />
                  </button>
                </Link>
              </div>
            </div>
 
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  alt="Our Story"
                  className="w-full h-full object-cover object-top"
                  src='/aboutPP.jpg' // Path to the image in the /public folder
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent"></div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-pink-600 to-red-600 rounded-full opacity-20"></div>
            </div>

          </div>
        </div>
      </section>
    </div >
  )
}
