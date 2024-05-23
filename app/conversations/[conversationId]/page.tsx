import MessageEmptyState from '@/app/conversations/[conversationId]/components/MessageEmptyState';
import Header from '@/app/conversations/[conversationId]/components/Header';
import Body from '@/app/conversations/[conversationId]/components/Body';
import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages';

interface Iparams {
  conversationId: string
}

const page = async ({ params }: { params: Iparams }) => {

  const [conversation, messages] = await Promise.all([getConversationById(params.conversationId), getMessages(params.conversationId)]);

  if (!conversation) {
    return (
      <MessageEmptyState />
    )
  }

  return (
    <div className='flex-1 bg-gray-100 h-full'>
      <div className="flex flex-col h-full">
        <Header conversation={conversation} />
        <Body conversationId={params.conversationId} initialMessages={messages} />
      </div>
    </div>
  )
}

export default page
