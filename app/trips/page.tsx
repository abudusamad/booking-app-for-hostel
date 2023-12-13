import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";

import ClientOnly from "../components/ClientOnly";
import EmpltyState from "../components/EmptyState";
import TripsClient from "./_components/TripsClient";

const TripsPage = async () => {
	const currentUser = await getCurrentUser();
	const reservations = await getReservation({ userId: currentUser?.id });
	if (!currentUser) {
		return (
			<ClientOnly>
				<EmpltyState
					title="You're not signed in."
					subtitle="Sign in to see your trips."
				/>
			</ClientOnly>
		);
	}

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmpltyState
					title="You don't have any trips."
					subtitle="Try adjusting your search or filters to find what you're looking for."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default TripsPage;
