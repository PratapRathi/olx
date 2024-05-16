"use client"
import Avatar from '@/app/components/Avatar'
import Button from '@/app/components/Button'
import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import HeartButton from '@/app/components/HeartButton'
import { Post, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface ListingClientProps {
    data: Post
    currentUser: User | null
}

const ListingClient: React.FC<ListingClientProps> = ({ data, currentUser }) => {
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <Heading title={`${data.title}, ${data.brand}`} subtitle={data.location} />
                    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                        <Image alt="Image" src={data.imageSrc} fill className="object-cover w-full" />
                        <div className="absolute top-5 right-5">
                            <HeartButton listingId={data.id} currentUser={currentUser} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <div className="flex flex-col col-span-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-center text-xl font-semibold gap-2">
                                    <div>Posted by {currentUser?.name}</div>
                                    <Avatar src={currentUser?.image} />
                                </div>
                                <Button label='Contact Seller'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
