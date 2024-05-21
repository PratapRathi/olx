import ConversationEmptyState from '@/app/conversations/components/ConversationEmptyState'

const conversations = () => {
  return (
    <div className='lg:flex-1 bg-gray-100 h-full hidden lg:block'>
      <ConversationEmptyState />
    </div>
  )
}

export default conversations