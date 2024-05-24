import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


const getConversation = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) { 
        console.log("1 is triggerd");
        return []
     }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {lastMessageAt: "desc"},
            where: {userIds: {has: currentUser.id}},
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        console.log("2 is triggerd");
        return conversations;

    } catch (error: any) {
        console.log("3 is triggerd");
        return [];
    }
}

export default getConversation;