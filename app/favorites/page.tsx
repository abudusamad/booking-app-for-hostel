import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import ClientOnly from "../components/ClientOnly";
import EmpltyState from "../components/EmptyState";

const FavoritesPage = async () => {
	const listings = await getFavoriteListing();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
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
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default FavoritesPage;
