"use client"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Avatar from "@/app/components/Avatar"
import ProfileDrawer from "./ProfileDrawer"
import { useState } from "react"
import Link from "next/link"

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation.users);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <div className="bg-white w-full flex border-b py-3 px-4 sm:px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link href="/conversations" className="lg:hidden block text-gray-500 transition cursor-pointer hover:bg-gray-600">
                        <HiChevronLeft size={32} />
                    </Link>
                    <Avatar src={otherUser.image} />
                    <h3 className="text-lg font-semibold">{otherUser.name}</h3>
                </div>
                <HiEllipsisHorizontal onClick={() => { setDrawerOpen(true) }} size={32} className="cursor-pointer transition text-gray-500 hover:text-gray-600" />
            </div>
        </>
    )
}

export default Header
