"use client"
import clsx from "clsx";
import { format } from "date-fns";
import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/app/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

interface ConversationBoxProps {
    data: FullConversationType
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data.users);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1]
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;
        if (!userEmail) return false;
        const seenArray = lastMessage.seen || []
        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    }, [lastMessage, userEmail])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return "Sent an image";
        if (lastMessage?.body) return lastMessage.body;
        return "Started new chat"
    }, [lastMessage])

    return (
        <div onClick={handleClick} className={clsx(`
            w-full relative flex items-center space-x-3 p-3 
            hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
            selected ? "bg-neutral-100" : "bg-white"
        )}>
            <Avatar src={otherUser.image} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-medium text-gray-900">
                            {otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs font-light text-gray-400">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`truncate text-sm`, hasSeen ? "text-gray-500" : "text-black font-medium")}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
