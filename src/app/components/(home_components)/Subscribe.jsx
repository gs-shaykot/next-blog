import subsBgc from '../../../../public/subsBgc.jpg';
import { CiLocationArrow1 } from "react-icons/ci";

export default function Subscribe() {
    return (
        <section className="py-12 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden mt-10">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${subsBgc.src})` }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-800/90 to-gray-900/90" aria-hidden="true" />

            <div className="relative z-10 flex justify-center items-center px-4">
                <div className="w-full max-w-3xl text-center bg-white/10 rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8">
                        Stay in the Loop
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 leading-relaxed">
                        Get the latest articles, insights, and updates delivered straight to your inbox
                    </p>

                    <div className="max-w-xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <input
                                placeholder="Enter your email address"
                                type="email"
                                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-white/30 focus:outline-none bg-white/90 backdrop-blur-sm border border-white/20 text-base sm:text-lg"
                            />
                            <button className="btn bg-gray-800 border-0 shadow-none h-full text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold">
                                Subscribe
                                <CiLocationArrow1 className="inline-block text-xl" />
                            </button>
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 mt-4 sm:mt-6">
                            No spam, unsubscribe at any time • Join 10,000+ readers
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
}
