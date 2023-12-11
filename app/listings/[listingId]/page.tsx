import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmpltyState from "@/app/components/EmptyState";
import ListingClient from "./_components/Listing-Client";

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const currentUser = await getCurrentUser();
	const listing = await getListingById(params);

	if ("status" in listing && "message" in listing) {
		// Handle the error here
		console.error(listing.message);
		return;
	}

	// Continue with the normal flow if there's no error

	if (!listing) {
		return (
			<ClientOnly>
				<EmpltyState
					title="Listing not found"
					subtitle="This listing may have been removed or the link is incorrect"
				/>
			</ClientOnly>
		);
	}
	return (
		<ClientOnly>
			<ListingClient currentUser={currentUser} listing={listing} />
		</ClientOnly>
	);
};

export default ListingPage;
