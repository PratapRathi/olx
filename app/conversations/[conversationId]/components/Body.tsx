"use client"
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types"
import MessageBox from "./MessageBox";
import { find } from "lodash"
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[]
  conversationId: string
}

const Body: React.FC<BodyProps> = ({ initialMessages, conversationId }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);


  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const newMessageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message];
      })
      bottomRef.current?.scrollIntoView();
    }

    const updateMessageHandler = (message: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === message.id) return message;
        return currentMessage;
      }))
    }

    pusherClient.bind("message:new", newMessageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", newMessageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    }
  }, [conversationId])


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
