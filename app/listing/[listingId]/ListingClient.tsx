"use client"
import Avatar from '@/app/components/Avatar'
import Button from '@/app/components/Button'
import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import HeartButton from '@/app/components/HeartButton'
import { SlCalender } from "react-icons/sl";
import { Post, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface ListingClientProps {
    data: Post
    currentUser: User | null
}

const ListingClient: React.FC<ListingClientProps> = ({ data, currentUser }) => {
    let year = data.kmDriven ? data.year + " - " + data.kmDriven + " km" : data.year;
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

                    <div className="grid grid-cols-1 md:grid-cols-8 gap-8 mt-6">
                        <div className='flex flex-col items-start justify-center col-span-4 py-3 px-4 rounded-xl shadow-lg outline outline-1 outline-gray-300'>
                            <h4 className='font-bold text-2xl text-gray-700'>Description</h4>
                            <p className='font-light text-gray-600 mt-2'>{data.description}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center col-span-4 md:col-span-2 py-3 px-4 rounded-xl shadow-lg outline outline-1 outline-gray-300'>
                            <h3 className='font-bold text-3xl text-gray-700'>{"₹ " + data.price}</h3>
                            <div className="flex gap-2 items-center">
                                <SlCalender size={20} className='text-gray-600'/>
                                <p className='font-light text-gray-600'>{year}</p>
                            </div>
                        </div>
                        <div className="flex flex-col col-span-4 md:col-span-2 gap-8 items-center justify-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-center text-xl font-semibold gap-2">
                                    <div>Posted by {currentUser?.name}</div>
                                    <Avatar src={currentUser?.image} />
                                </div>
                                <Button label='Contact Seller' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
