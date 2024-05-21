import React from 'react'
import getFavoriteListing from '@/app/actions/getFavoriteListing'
import getCurrentUser from '@/app/actions/getCurrentUser'
import EmptyState from '@/app/components/EmptyState';
import Container from '@/app/components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listing/ListingCard';

const page = async () => {
  const [favorite, currentUser] = await Promise.all([getFavoriteListing(), getCurrentUser()]);

  if (favorite.length === 0) {
    return (
      <div className='pb-20 pt-28'>
        <EmptyState title="No favorite found" subtitle="Looks like you have no favorite Item" />
      </div>
    )
  }
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite Post" />
      <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favorite.map((listing) => (
          <ListingCard data={listing} key={listing.id} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  )
}

export default page
