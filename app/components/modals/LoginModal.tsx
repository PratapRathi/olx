"use client"
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import useLoginModel from '@/app/hooks/useLoginModal';
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { User } from "@prisma/client";

type loginProvider = "google" | "github" | "linkedin";


const LoginModal = () => {
    const loginModal = useLoginModel();
    const [isLoading, setIsLoading] = useState(false);
    const loginAction = useCallback((provider: loginProvider) => {
        if(isLoading) return;
        setIsLoading(true);
        const toastId = toast.loading("Loading...");
        signIn(provider).then(() => {
            toast.remove(toastId);
        }).catch(() => {
            toast.error("Something went wrong", { id: toastId })
        }).finally(() => {
            setIsLoading(false);
        })
    }, [isLoading]);

    if (!loginModal.isOpen) return null;
    return (
        <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className="relative bg-white rounded-lg shadow flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-center w-full">
                        <button onClick={loginModal.onClose} className='p-1 border-2 border-transparent rounded-lg hover:border-black transition  absolute right-5'>
                            <IoMdClose size={18} />
                        </button>
                        <div className="text-lg font-semibold">Login to proceed</div>
                    </div>
                    <hr />
                    <button disabled={isLoading} onClick={() => loginAction("google")} className='flex items-center justify-center w-full gap-2 rounded-lg border border-slate-300
                     bg-white p-2 text-sm font-medium text-black outline-none hover:ring-1 hover:ring-[#333] hover:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60'>
                        <FcGoogle size={18} />
                        Login with Google
                    </button>
                    <button disabled={isLoading} onClick={() => loginAction("github")} className='flex items-center justify-center w-full gap-2 rounded-lg border border-slate-300
                     bg-white p-2 text-sm font-medium text-black outline-none hover:ring-1 hover:ring-[#333] hover:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60'>
                        <FaGithub size={18} />
                        Login with Github
                    </button>
                    <button disabled={isLoading} onClick={() => loginAction("linkedin")} className='flex items-center justify-center w-full gap-2 rounded-lg border border-slate-300
                     bg-white p-2 text-sm font-medium text-black outline-none hover:ring-1 hover:ring-[#333] hover:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60'>
                        <FaLinkedin color='#0A66C2' size={18} />
                        Login with Linkedin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
