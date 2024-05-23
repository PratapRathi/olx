import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
    conversationId: string
}

export async function POST(request: Request, { params }: { params: Iparams }) {
    try {
        const { conversationId } = params;

        const [currentUser, conversation] = await Promise.all([
            getCurrentUser(),
            // Find the existing conversation
            prisma.conversation.findUnique({
                where: { id: conversationId },
                include: {
                    messages: { include: { seen: true } },
                    users: true
                }
            })
        ])

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }

        if (!conversation) return new NextResponse("Invalid ID", { status: 400 });

        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) return NextResponse.json(conversation);

        // Update seen of last message
        const updatedMessage = await prisma.message.update({
            where: { id: lastMessage.id },
            include: { sender: true, seen: true },
            data: { seen: { connect: { id: currentUser.id } } }
        })

        // TODO => Pusher update Conversation

        if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation);
        }

        // TODO => Pusher update messages

        return NextResponse.json(updatedMessage);

    } catch (error: any) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}