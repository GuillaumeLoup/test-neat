import React from 'react'

type InputVariant = 'filled' | 'outlined'
type InputColor = 'gray' | 'red' | 'green'

interface InputFieldProps {
    label?: string
    icon?: React.ReactNode
    variant: InputVariant
    color: InputColor
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const getInputClasses = (variant: InputVariant, color: InputColor) => {
    const baseClass = 'rounded-md w-full md:w-[320px] h-12 py-2 px-10'

    const variantClass = variant === 'outlined'
        ? 'border border-white rounded-md bg-transparent'
        : 'border-none'

    const colorClass = color === 'gray'
        ? (variant === 'outlined' ? 'text-gray-300' : 'text-gray-800')
        : color === 'red'
            ? 'text-red-600'
            : 'text-[#44F485]'

    return `${baseClass} ${variantClass} ${colorClass}`
}
const InputField = ({ label, icon, variant, color, value, onChange }: InputFieldProps) => {
    const inputClasses = getInputClasses(variant, color)

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm text-white">{label}</label>}
            <div className="relative h-12 rounded-lg w-full block disabled:opacity-50 disabled:pointer-events-none placeholder:text-sm text-base text-white focus:outline-none">
                {icon && (
                    <span className="absolute left-3 top-4 text-gray-400">
                        {icon}
                    </span>
                )}
                <input
                    className={inputClasses}
                    value={value}
                    onChange={onChange}
                    placeholder="tapez votre recherche..."
                />
            </div>
        </div>
    )
}

export default InputField
