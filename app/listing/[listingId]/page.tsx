import getListingById from '@/app/actions/getListingbyId'
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface Iparams {
  listingId?: string
}

const page = async ({ params }: { params: Iparams }) => {
  const [currentUser, listing] = await Promise.all([getCurrentUser(), getListingById(params)])

  if (!listing) {
    return (
      <EmptyState />
    )
  }

  return (
    <ListingClient data={listing} currentUser={currentUser}/>
  )
}

export default page
