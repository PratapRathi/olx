"use client"
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useLoginModel from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import useSellModal from "@/app/hooks/useSellModal";
import { useRouter } from "next/navigation";


interface UserMenuProps {
    currentUser: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const sellModal = useSellModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen])

    const loginModal = useLoginModel();

    const logout = useCallback(() => {
        const toastId = toast.loading("Loading...");
        signOut().then(() => {
            toast.success("Logged out successfully", { id: toastId });
        }).catch(() => {
            toast.error("Something went wrong", { id: toastId })
        })
    }, [])

    return (
        <div className="relative cursor-pointer" onClick={handleOpen}>
            <div className="flex flex-row items-center justify-center bg-white rounded-full gap-3 shadow-lg
                border-2 border-gray-300 hover:border-black p-2 md:py-1 md:px-2
            ">
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-36 overflow-hidden bg-white right-0 top-12">
                    <div className="flex flex-col cursor-pointer">
                        {!currentUser ? (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={sellModal.onOpen} label="Sell Now" />
                                <MenuItem onClick={()=> router.push("/favorites")} label="Favorites" />
                                <MenuItem onClick={()=> router.push("/selfPost")} label="My Post" />
                                <MenuItem onClick={()=> router.push("/conversations")} label="My Conversation" />
                                <hr />
                                <MenuItem onClick={logout} label="Logout" /></>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
