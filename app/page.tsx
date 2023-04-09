import getListings from "./api/listing/getAllListings";
import getMe from "./api/user/me";
import Container from "./components/common/Container";
import EmptyState from "./components/common/EmptyState";
import ListingCard from "./components/common/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const user = await getMe();

  const isEmpty = !listings?.length;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={user} />
        ))}
      </div>
    </Container>
  );
}
