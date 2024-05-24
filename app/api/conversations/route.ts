import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";


export async function POST(request: Request) {
    try {
        const [currentUser, body] = await Promise.all([getCurrentUser(), request.json()])
        const { userId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized access", { status: 401 })
        }

        if (!userId) {
            return new NextResponse("Invalid Data", { status: 401 })
        }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    { userIds: { equals: [currentUser.id, userId] } },
                    { userIds: { equals: [userId, currentUser.id] } }
                ]
            }
        })

        const singleConversation = existingConversation[0];
        if (singleConversation) return NextResponse.json(singleConversation);

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        { id: currentUser.id },
                        { id: userId }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        newConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "conversation-new", newConversation);
            }
        })

        return NextResponse.json(newConversation);

    } catch (error: any) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}