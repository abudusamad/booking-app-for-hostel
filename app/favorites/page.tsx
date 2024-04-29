import { SafeUser } from "@/types";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import ClientOnly from "../components/ClientOnly";
import EmpltyState from "../components/EmptyState";
import FavoritesClient from "./_components/Favorite-Client";

const FavoritesPage = async () => {
	const listings = await getFavoriteListing();
	const currentUser = await getCurrentUser();

	if (!listings || listings.length === 0) {
		return (
			<ClientOnly>
				<EmpltyState
					title="You don't have any favorites yet"
					subtitle="Looks like you have not added any favorites yet. Click the heart icon on any listing to add it to your favorites."
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<FavoritesClient listings={listings} currentUser={currentUser as unknown as SafeUser} />
		</ClientOnly>
	);
};

export default FavoritesPage;
