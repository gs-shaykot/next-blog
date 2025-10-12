import { ArrowUp, FileText } from 'lucide-react'
import React from 'react'

export default function StatsCards({ cardItems }) {
    console.log(cardItems)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardItems.map((card, i) => (
                <div
                    key={i}
                    className={`${card.color} rounded-xl p-6 text-white relative overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                    
                    <div
                        className="absolute top-3 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    >
                        <card.icon size={52} />
                    </div>

                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold opacity-90 uppercase tracking-wider">
                                {card.title}
                            </h3>

                            <div
                                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                            >
                                <card.icon size={16} />
                            </div>
                        </div>

                        <div className="text-2xl font-bold mb-2">
                            {card.value}
                        </div>

                        <div className="flex items-center text-xs">
                            <div
                                className="flex items-center px-2 py-1 rounded-full bg-green-500/20"
                            >
                                {/* Replaced <i class="ri-arrow-up-line mr-1"></i> with Lucide's ArrowUp */}
                                <ArrowUp size={12} className="mr-1" />
                                <span className="font-medium"> {card.percent}% this month</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
