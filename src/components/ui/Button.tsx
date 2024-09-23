import React from 'react'

type ButtonVariant = 'filled' | 'outlined' | 'ghost'
type ButtonColor = 'gray' | 'red' | 'green'

interface ButtonProps {
    variant: ButtonVariant
    color: ButtonColor
    onClick: () => void
    children: React.ReactNode
}

const getButtonClasses = (variant: ButtonVariant, color: ButtonColor) => {
    const baseClasses = 'px-6 py-2 min-h-12 max-w[200px]'
    const variantClasses = variant === 'outlined' ?
        'border border-slate-600 rounded-md bg-transparent'
        : variant === 'filled' ?
            'border-none'
            : 'border-none underline underline-offset-2'


    const colorClasses = color === 'gray' ?
        'text-gray-300' :
        color === 'green' ?
            'text-[#44F485]'
            : 'text-red-600'

    return `${baseClasses} ${variantClasses} ${colorClasses}`
}

const Button = ({ variant, color, onClick, children }: ButtonProps) => {
    const buttonClasses = getButtonClasses(variant, color)
    return (
        <button
            className={buttonClasses}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
