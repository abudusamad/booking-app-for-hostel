import { Container } from "@/app/components/Containter";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";

interface FavoritesClientProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

const FavoritesClient = async ({listings,currentUser }: FavoritesClientProps) => {
	return (
		<Container>
			<Heading title="Favorites" subtitle="Your favorite listings" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavoritesClient;
