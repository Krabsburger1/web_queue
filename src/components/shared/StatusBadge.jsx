import React from 'react'

const statusConfig = {
    waiting: { label: 'Waiting', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'in-progress': { label: 'In Progress', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    done: { label: 'Done', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    cancelled: { label: 'Cancelled', bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
    'no-show': { label: 'No Show', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
}

export default function StatusBadge({ status }) {
    const config = statusConfig[status] || statusConfig.waiting
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
        >
            {config.label}
        </span>
    )
}
