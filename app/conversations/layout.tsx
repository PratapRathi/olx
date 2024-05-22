import React from 'react'
import ConversationList from '@/app/conversations/components/ConversationList'
import getConversation from '@/app/actions/getConversation';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversation();

    return (
        <div className='h-full w-full flex pt-16'>
            <ConversationList initialItems={conversations}/>
            {children}
        </div>
    )
}

export default layout
