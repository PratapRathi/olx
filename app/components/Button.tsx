"use client"
import clsx from "clsx"

interface ButtonProps {
    label: string
    className?: string
}

const Button: React.FC<ButtonProps> = ({label, className}) => {
  return (
    <button className={clsx("outline outline-1 outline-gray-300 border-2 border-transparent hover:border-black font-semibold", className)}>
      {label}
    </button>
  )
}

export default Button
