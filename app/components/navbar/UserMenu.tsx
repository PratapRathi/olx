"use client"
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";


const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = useCallback(()=>{
        setIsOpen(!isOpen);
    },[isOpen])

    let currentUser = true;
    return (
        <div className="relative cursor-pointer" onClick={handleOpen}>
            <div className="flex flex-row items-center justify-center bg-white rounded-full gap-3 shadow-lg
                border-2 border-gray-300 hover:border-black p-2 md:py-1 md:px-2
            ">
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar />
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-36 overflow-hidden bg-white right-0 top-12">
                    <div className="flex flex-col cursor-pointer">
                        {!currentUser ? (
                            <>
                                <MenuItem label="Login" />
                                <MenuItem label="Signup" />
                            </>
                        ) : (
                            <>
                                <MenuItem label="Sell Now" />
                                <MenuItem label="Favorites" />
                                <MenuItem label="My Post" />
                                <hr />
                                <MenuItem label="Logout" /></>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
