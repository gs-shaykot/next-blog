'use client'
import Image from 'next/image'
import React from 'react'
import { FiSend } from "react-icons/fi";
import { MdEmail, MdChatBubble, MdCalendarToday } from 'react-icons/md';
import { useSelector } from 'react-redux';

export default function page() {

    const themeMode = useSelector((mode) => mode.themeToggle.mode);

    const faqs = [
        {
            question: "How quickly do you respond to inquiries?",
            answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat feature for immediate assistance.",
        },
        {
            question: "Do you accept guest writers?",
            answer: 'Yes! We welcome guest writers who can contribute high-quality, original content. Please use the contact form above and select "Guest Writing" as your subject to learn more about our submission guidelines.',
        },
        {
            question: "Can you help with content strategy?",
            answer: "Absolutely! We offer content strategy consultations to help you plan and execute effective content marketing campaigns. Schedule a call with our team to discuss your needs.",
        },
        {
            question: "Do you offer partnership opportunities?",
            answer: 'We are always open to exploring partnerships with like-minded brands and creators. Please reach out through our contact form with "Partnership" as the subject to discuss potential collaborations.',
        },
    ]

    return (
        <div className={`${themeMode === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
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
            {/* Contact from */}
            <div>
                <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} py-20 font-sans`}>
                    <div className="max-w-4xl mx-auto px-6">
                        <div className={`${themeMode === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-xl p-8 md:p-12`}>

                            <div className="text-center mb-16">
                                <h2 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
                                    Send Us a <span className="text-indigo-600">Message</span>
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Fill out the form below and we'll get back to you as soon as possible
                                </p>
                            </div>

                            <form id="contact-form" className="space-y-6" >

                                {/* Name and Email Inputs */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} block text-sm font-semibold mb-2`}>Full Name *</label>
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
                                        <label htmlFor="email" className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} block text-sm font-semibold mb-2`}>Email Address *</label>
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
                                    <label htmlFor="subject" className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} block text-sm font-semibold mb-2`}>Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className={`${themeMode === 'dark' ? 'bg-gray-900' : ''}  w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm appearance-none`}
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
                                    <label htmlFor="message" className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-700'} block text-sm font-semibold mb-2`}>Message *</label>
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

            {/* Other Ways */}
            <div className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
                            Other Ways to <span className="text-indigo-600">Connect</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Choose the method that works best for you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'text-gray-900'} text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300`}>
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MdEmail className="text-2xl text-indigo-600" />
                            </div>
                            <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-semibold mb-3`}>
                                Email Us
                            </h3>
                            <p className={`${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                                Send us an email and we'll respond within 24 hours
                            </p>
                            <a
                                href="mailto:hello@blogcraft.com"
                                className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                            >
                                hello@blogcraft.com
                            </a>
                        </div>

                        <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'text-gray-900'} text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300`}>
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MdChatBubble className="text-2xl text-purple-600" />
                            </div>
                            <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-semibold mb-3`}>
                                Live Chat
                            </h3>
                            <p className={`${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                                Chat with our team for instant support and answers
                            </p>
                            <button className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer">
                                Start Chat
                            </button>
                        </div>

                        <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'text-gray-900'} text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300`}>
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MdCalendarToday className="text-2xl text-blue-600" />
                            </div>
                            <h3 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-xl font-semibold mb-3`}>
                                Schedule a Call
                            </h3>
                            <p className={`${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-600'} mb-4`}>
                                Book a consultation to discuss your content strategy
                            </p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                                Book Meeting
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-5xl mx-auto px-6 pb-10">
                <div className="text-center mb-10">
                    <h2 className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'} text-3xl md:text-4xl font-bold mb-4`}>
                        Frequently Asked <span className="text-indigo-600">Questions</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Quick answers to common questions about BlogCrafts
                    </p>
                </div>

                <div className={`${themeMode === 'dark' ? 'bg-gray-800' : 'bg-base-100'} join join-vertical`}>
                    {
                        faqs.map((faq, idx) => (
                            <div key={idx} className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" defaultChecked={idx === 0} />
                                <div className="collapse-title font-semibold">{faq.question}</div>
                                <div className="collapse-content text-sm">{faq.answer}</div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
