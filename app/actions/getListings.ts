import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string
    category?: string
    location?: string
    search?: string
    self?: boolean
}

export default async function getListings(params: IListingParams) {
    const { userId, category, location, search, self } = params;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (location) query.location = location;
    if (search) query.title = { contains: search, mode: 'insensitive' }
    if (!self) query.sold = false;

    const listings = await prisma.post.findMany({
        where: query,
        orderBy: {
            createdAt: "desc"
        }
    })

    return listings;
}