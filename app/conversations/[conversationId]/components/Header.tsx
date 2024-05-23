"use client"

import { Conversation, User } from "@prisma/client"

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({conversation}) => {
    return (
        <div>

        </div>
    )
}

export default Header
