import React from 'react'

const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm',
    danger: 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200',
    ghost: 'hover:bg-gray-100 text-gray-600',
}

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
