"use client"
import clsx from "clsx"

interface ButtonProps {
  label: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, className, onClick, disabled }) => {
  return (
    <button disabled={disabled || false} onClick={onClick} className={clsx("rounded-xl bg-white py-2 px-3 shadow-lg outline outline-1 outline-gray-300 border-2 border-transparent hover:border-black font-semibold", className)}>
      {label}
    </button>
  )
}

export default Button
