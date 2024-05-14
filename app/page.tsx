import getListings, { IListingParams } from "@/app/actions/getListings";
import Container from "@/app/components/Container";


interface HomeProps {
  searchParams: IListingParams
}

 const Home = async({searchParams}: HomeProps) => {
  const listings = await getListings(searchParams);
  
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

      </div>
    </Container>  
  );
}

export default Home
export const dynamic = 'force-dynamic'