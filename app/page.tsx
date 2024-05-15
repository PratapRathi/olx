import getListings, { IListingParams } from "@/app/actions/getListings";
import Container from "@/app/components/Container";
import ListingCard from "./components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import EmptyState from "./components/EmptyState";


interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const [listings, currentUser] = await Promise.all([getListings(searchParams), getCurrentUser()])
  
  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}

export default Home
export const dynamic = 'force-dynamic'