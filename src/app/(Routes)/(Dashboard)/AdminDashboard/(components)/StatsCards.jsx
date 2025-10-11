import React from 'react'

export default function StatsCards({cardItems}) {
    console.log(cardItems)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardItems.map((card, i) => (
                <div
                    key={i}
                    className={`p-6 text-white rounded-xl shadow-sm ${card.color}`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <p>{card.title}</p>
                        {card.icon}
                    </div>
                    <h2 className="text-3xl font-bold">{card.value}</h2>
                    <p className="text-sm opacity-80 mt-1">↗ {card.percent}% this month</p>
                </div>
            ))}
        </div>
    )
}
