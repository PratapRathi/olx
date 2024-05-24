import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";


export async function POST(request: Request) {
    try {
        const [currentUser, body] = await Promise.all([getCurrentUser(), request.json()]);

        const { message, image, conversationId } = body;
        if (!currentUser?.id || !currentUser.email) return new NextResponse("UnAuthorized", { status: 401 });

        const newMessage = await prisma.message.create({
            include: {
                seen: true,
                sender: true
            },
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: { id: conversationId }
                },
                sender: {
                    connect: { id: currentUser.id }
                },
                seen: {
                    connect: { id: currentUser.id }
                }
            }
        })

        // TODO => Update Pusher for new Message
        const [pusherResult, updatedConversation] = await Promise.all([
            pusherServer.trigger(conversationId, "messages:new", newMessage),
            prisma.conversation.update({
                where: { id: conversationId },
                data: {
                    lastMessageAt: new Date(),
                    messages: { connect: { id: newMessage.id } }
                },
                include: {
                    users: true,
                    messages: {
                        include: { seen: true },
                        orderBy: { createdAt: "desc" },
                        take: 1
                    }
                }
            })
        ])

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        // TODO => Send this last message to all Conversation participants via Pusher

        return NextResponse.json(newMessage);

    } catch (error: any) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}