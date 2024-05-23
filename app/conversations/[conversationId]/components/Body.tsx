"use client"
import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/app/types"
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[]
  conversationId: string
}

const Body: React.FC<BodyProps> = ({ initialMessages, conversationId }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);



  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessageBox data={message} key={message.id} isLast={idx === messages.length - 1} />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body
