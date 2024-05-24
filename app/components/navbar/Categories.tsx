"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { FaCarSide, FaMotorcycle, FaMobile, FaLaptop } from "react-icons/fa";
import { ImMobile2 } from "react-icons/im";
import CategoryBox from "./CategoryBox";
import { Suspense } from "react";

export const categories = [
    {
        label: "Car",
        icon: FaCarSide
    },
    {
        label: "Motorcycle",
        icon: FaMotorcycle
    },
    {
        label: "Mobile",
        icon: FaMobile
    },
    {
        label: "Tablet",
        icon: ImMobile2
    },
    {
        label: "Laptop",
        icon: FaLaptop
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");

    const pathName = usePathname();
    const isMainPage = pathName === "/";

    if (!isMainPage) return null;
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto bg-white">
                {categories.map((item) => (
                    <Suspense key={item.label}>
                        <CategoryBox key={item.label} icon={item.icon} label={item.label} selected={category === item.label} />
                    </Suspense>
                ))}
            </div>
        </div>
    )
}

export default Categories
