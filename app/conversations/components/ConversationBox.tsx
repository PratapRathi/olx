"use client"

import { FullConversationType } from "@/app/types"
import clsx from "clsx"

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    return (
        <div className={clsx(`
            w-full relative flex items-center space-x-3 p-3 
            hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
            selected ? "bg-neutral-100" : "bg-white"
        )}>
            
        </div>
    )
}

export default ConversationBox
