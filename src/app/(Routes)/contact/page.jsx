import Image from 'next/image'
import React from 'react'
import { FiSend } from "react-icons/fi";
export default function page() {
    return (
        <div>
            {/* banner */}
            <div className="relative w-full h-72 md:h-96 mt-18">
                <Image
                    src="/contactBg.jpg"
                    alt="Profile Banner"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80" />

                <div className="absolute inset-0 flex items-center flex-col justify-center">
                    <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">Get in <span className="text-blue-200">Touch</span></h1>
                    <p className="text-lg max-w-3xl text-center text-white">Have a story to share or need help with your content? We'd love to hear from you and help bring your ideas to life.</p>
                </div>
            </div>

            <div>
                <div className="py-20 bg-gray-50 font-sans">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                                <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you as soon as possible</p>
                            </div>
 
                            <form id="contact-form" className="space-y-6" >

                                {/* Name and Email Inputs */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                            placeholder="Enter your full name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                            placeholder="Enter your email address"
                                            type="email"
                                        />
                                    </div>
                                </div>
 
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm appearance-none"
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Content Collaboration">Content Collaboration</option>
                                        <option value="Guest Writing">Guest Writing</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        maxLength="500"
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-y"
                                        placeholder="Tell us about your inquiry or how we can help you..."
                                    ></textarea>
                                    <div className="text-right text-sm text-gray-500 mt-1">0/500 characters</div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                                    >
                                        <span className="flex items-center justify-center gap-1">
                                            <FiSend />
                                            Send Message
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
