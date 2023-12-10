import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import { Container } from "./components/Containter";
import EmpltyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
	const listings = await getListings();
	const curentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmpltyState showReset />
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<Container>
				<div
					className="pt-48 
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
				>
					{listings.map((listing: any) => (
						<ListingCard
							key={listing.id}
							data={listing}
							curentUser={curentUser}
						/>
					))}
				</div>
			</Container>
		</ClientOnly>
	);
}
