"use client"
import { FullMessageType } from "@/app/types"
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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

      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body
