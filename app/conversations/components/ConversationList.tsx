"use client"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { useMemo } from "react"

const ConversationList = () => {
  const params = useParams()
  const isChatOpen = useMemo(()=>{
    if(!params?.conversationId) return false;
    return true;
  },[params?.conversationId])

  return (
    <div className={clsx('w-[100%] lg:w-80 h-full lg:border-r border-gray-300 px-5', isChatOpen? 'hidden lg:block':'')}>
      <div className='mb-4 pt-4 text-2xl font-bold text-neutral-800'>Messages</div>
    </div>
  )
}

export default ConversationList
