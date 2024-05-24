"use client"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ConversationBox from "./ConversationBox"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface ConversationListProps {
  initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const session = useSession();
  const router = useRouter();
  const [conversationItems, setConversationItems] = useState(initialItems);

  const params = useParams()
  const currentConversationId = useMemo(() => {
    if (!params?.conversationId) return "";
    return params.conversationId as string
  }, [params?.conversationId])

  const isChatOpen = useMemo(() => {
    return !!currentConversationId
  }, [currentConversationId])

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;
    pusherClient.subscribe(pusherKey);

    const newConversationHandler = (conversation: FullConversationType) => {
      setConversationItems((current) => {
        if (find(current, { id: conversation.id })) return current;
        return [conversation, ...current];
      })
    }

    const updateConversationHandler = (conversation: FullConversationType) => {
      setConversationItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return { ...currentConversation, messages: conversation.messages };
        }
        return currentConversation;
      }))
    }

    const removeConversationHandler = (conversation: FullConversationType) => {
      setConversationItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      })
      if (conversation.id === currentConversationId) {
        router.push("/conversations");
      }
    }

    pusherClient.bind("conversation-new", newConversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:remove", removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation-new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:remove", removeConversationHandler);
    }
  }, [pusherKey, currentConversationId, router]);

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
