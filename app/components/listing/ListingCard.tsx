"use client"
import { Post, User } from "@prisma/client"
import Image from "next/image"
import HeartButton from "../HeartButton"


interface ListingCardProps {
    currentUser?: User | null
    data: Post
}

const ListingCard: React.FC<ListingCardProps> = ({ currentUser, data }) => {
    return (
        <div onClick={() => { }} className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-1 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill alt="Listing" src={data.imageSrc} className='object-cover h-full w-full transition group-hover:scale-110' />
                    <div className="absolute top-3 right-3">
                        <HeartButton currentUser={currentUser} listingId={data.id} />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.title}, {data.brand}
                </div>
                <div className="font-light text-neutral-500">
                    {data.category}
                </div>
                <div className="font-semibold">₹ {data.price}</div>
            </div>
        </div>
    )
}

export default ListingCard
