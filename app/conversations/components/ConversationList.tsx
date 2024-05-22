"use client"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import ConversationBox from "./ConversationBox"

interface ConversationListProps {
  initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const [conversationItems, setConversationItems] = useState(initialItems);

  const params = useParams()
  const currentConversationId = useMemo(() => {
    if (!params?.conversationId) return "";
    return params.conversationId as string
  }, [params?.conversationId])

  const isChatOpen = useMemo(() => {
    return !!currentConversationId
  }, [currentConversationId])

  return (
    <div className={clsx('w-[100%] lg:w-80 h-full lg:border-r border-gray-300 px-5', isChatOpen ? 'hidden lg:block' : '')}>
      <div className='mb-4 pt-4 text-2xl font-bold text-neutral-800'>Messages</div>
      {conversationItems.map((item) => (
        <ConversationBox key={item.id} data={item} selected={currentConversationId === item.id} />
      ))}
    </div>
  )
}

export default ConversationList
