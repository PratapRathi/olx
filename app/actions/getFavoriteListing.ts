import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListing() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) return [];

        const favorite = await prisma.post.findMany({
            where:{
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        return favorite

    } catch (error: any) {
        throw new Error(error);
    }
}