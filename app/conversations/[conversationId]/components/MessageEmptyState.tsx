"use client"
import Button from '@/app/components/Button'
import { useRouter } from 'next/navigation'

const MessageEmptyState = () => {
    const router = useRouter();
    return (
        <div className='flex-1 bg-gray-100 h-full'>
            <div className="flex h-full items-center justify-center">
                <h4 className='text-xl font-semibold text-gray-900'>Invalid Conversation</h4>
                <Button onClick={() => router.push("/conversations")} label='Go back' />
            </div>
        </div>
    )
}

export default MessageEmptyState
