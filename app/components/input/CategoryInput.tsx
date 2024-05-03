"use client"
import clsx from "clsx"
import { IconType } from "react-icons"

interface CategoryInputProps {
    label: string,
    icon: IconType,
    onClick: (id: string, value: any) => void,
    selected?: boolean
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, onClick, selected }) => {
    return (
        <div onClick={() => onClick("category", label)} className={clsx(`flex items-start justify-center flex-col p-3 gap-2 border-2 rounded-lg 
        hover:border-black cursor-pointer`, selected ? "border-black" : "border-gray-300")}>
            <Icon size={20} />
            <span>{label}</span>
        </div>
    )
}

export default CategoryInput
