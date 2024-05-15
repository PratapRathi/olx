import React from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getListings from '@/app/actions/getListings';
import EmptyState from '@/app/components/EmptyState';
import SelfPostClient from './SelfPostClient';

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please Login" />
    )
  }
  const listings = await getListings({ userId: currentUser?.id, self: true });

  if (listings.length === 0) {
    <EmptyState title="No properties found" subtitle="Looks like you have no properties" />
  }

  return (
    <SelfPostClient currentUser={currentUser} listings={listings}/>
  )
}

export default page
