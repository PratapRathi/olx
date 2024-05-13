import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return new NextResponse("Not Authorized", { status: 400 });

        const body = await request.json();
        const { category, location, brand, title, description, kmDriven, year, price, imageSrc } = body;

        const newPost = await prisma.post.create({
            data: {
                category,
                location,
                brand,
                title,
                description,
                kmDriven: parseInt(kmDriven, 10),
                year: parseInt(year, 10),
                price: parseInt(price, 10),
                imageSrc,
                userId: currentUser.id
            }
        })

        return NextResponse.json(newPost);
    } catch (error: any) {
        return new NextResponse("Something went wrong", {status: 500});
    }
}