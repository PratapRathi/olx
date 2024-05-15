"use client"
import { Post, User } from "@prisma/client"
import Container from "@/app/components/Container"
import Heading from "@/app/components/Heading"
import ListingCard from "../components/listing/ListingCard"

interface SelfPostClientProps {
    listings: Post[]
    currentUser?: User | null
}

const SelfPostClient: React.FC<SelfPostClientProps> = ({ listings, currentUser }) => {
    return (
        <Container>
            <Heading title="Your Items" subtitle="List of your posted items" />
            <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} data={listing} currentUser={currentUser} selfItem/>
                ))}
            </div>
        </Container>
    )
}

export default SelfPostClient
