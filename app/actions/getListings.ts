import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string
    category?: string
    location?: string
}

export default async function getListings(params: IListingParams) {
    const { userId, category, location } = params;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (location) query.location = location;

    const listings = await prisma.post.findMany({
        where: query,
        orderBy: {
            createdAt: "desc"
        }
    })

    return listings;
}