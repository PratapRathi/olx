"use client"

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormGetFieldState, UseFormRegister } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";

interface TextInputProps {
    id: string
    label: string
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    type?: string
    price?: boolean
}

const TextInput: React.FC<TextInputProps> = ({ id, label, type = "text", register, errors, price }) => {
    return (
        <>
            <div className="relative w-full min-w-[200px] h-10">
                {price && <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                    <FaRupeeSign className="text-gray-400" />
                </div>}

                <input
                    id={id}
                    {...register(id, { required: true })}
                    type={type}
                    className={clsx(`peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]`,
                        errors[id] ? "placeholder-shown:border-red-500" : "placeholder-shown:border-gray-200",
                        errors[id] ? "placeholder-shown:border-t-red-500" : "placeholder-shown:border-t-gray-200",
                        errors[id] ? "border-red-500" : "border-gray-200",
                        errors[id] ? "focus:border-red-500" : "focus:border-gray-900"
                    )}
                    placeholder=" "
                />
                <label className={clsx(`flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75]`,
                    errors[id] ? "peer-placeholder-shown:text-red-500" : "peer-placeholder-shown:text-gray-500",
                    errors[id] ? "peer-disabled:peer-placeholder-shown:text-red-500" : "peer-disabled:peer-placeholder-shown:text-gray-500",
                    errors[id] ? "text-red-500" : "text-gray-500",
                    errors[id] ? "peer-focus:text-red-500" : "peer-focus:text-gray-900",
                    errors[id] ? "before:border-red-500" : "before:border-gray-200",
                    errors[id] ? "peer-focus:before:!border-red-500" : "peer-focus:before:!border-gray-900",
                    errors[id] ? "after:border-red-500" : "after:border-gray-200",
                    errors[id] ? "peer-focus:after:!border-red-500" : "peer-focus:after:!border-gray-900",
                )}>
                    {label}
                </label>

            </div>
        </>
    )
}

export default TextInput
