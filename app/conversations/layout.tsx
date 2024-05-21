import React from 'react'
import ConversationList from '@/app/conversations/components/ConversationList'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full w-full flex pt-16'>
            <ConversationList />
            {children}
        </div>
    )
}

export default layout
