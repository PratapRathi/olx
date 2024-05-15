"use client"
import { Post, User } from "@prisma/client"
import Image from "next/image"
import HeartButton from "../HeartButton"
import { FaLocationDot } from "react-icons/fa6";
import Button from "../Button";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


interface ListingCardProps {
    currentUser?: User | null
    data: Post
    selfItem?: boolean
}

const ListingCard: React.FC<ListingCardProps> = ({ currentUser, data, selfItem }) => {
    const router = useRouter();

    const handleSell = useCallback(() => {
        const toastId = toast.loading("Loading");
        axios.post(`/api/sell/${data.id}`).then(() => {
            toast.success("Updated Successfully", { id: toastId });
        }).catch(() => {
            toast.error("Something went wrong", { id: toastId })
        }).finally(() => {
            router.refresh();
        })
    }, [data.id, router]);

    const handleDelete = useCallback(() => {
        const toastId = toast.loading("Loading");
        axios.delete(`/api/listing/${data.id}`).then(() => {
            toast.success("Deleted Successfully", { id: toastId });
        }).catch(() => {
            toast.error("Something went wrong", { id: toastId })
        }).finally(() => {
            router.refresh();
        })
    }, [data.id, router])

    return (
        <div className="col-span-1 cursor-pointer group relative">
            {data.sold && <Image alt="Sold" src={"/images/sold.png"} height={160} width={160} className="absolute top-0 right-0 z-10 bg-transparent" />}
            <div onClick={() => { router.push(`/listing/${data.id}`) }} className="flex flex-col gap-1 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill alt="Listing" src={data.imageSrc} className='object-cover h-full w-full transition hover:scale-110' />
                    <div className="absolute top-3 right-3">
                        <HeartButton currentUser={currentUser} listingId={data.id} />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {data.title}, {data.brand}
                </div>
                <div className="font-light text-neutral-500 flex items-center justify-between">
                    <span>{data.category}</span>
                    <div className="flex items-center justify-center gap-1">
                        <FaLocationDot />
                        <span>{data.location}</span>
                    </div>
                </div>
                <div className="font-semibold">₹ {data.price}</div>
            </div>
            <div>
                {selfItem && (
                    <div className="flex items-center justify-center gap-2">
                        {!data.sold && <Button onClick={handleSell} label="Sold" className="w-full" />}
                        <Button onClick={handleDelete} label="Delete" className="w-full !bg-rose-500 text-white hover:bg-red-600" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListingCard
