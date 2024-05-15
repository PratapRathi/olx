import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Iparams {
    listingId?: string
}

export async function POST(request: Request, { params }: { params: Iparams }) {
    console.log("Api Hit");
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID")
    }

    const listing = await prisma.post.updateMany({
        where: {
            id: listingId,
            userId: currentUser.id
        },
        data: {
            sold: true
        }
    })

    return NextResponse.json(listing);
}