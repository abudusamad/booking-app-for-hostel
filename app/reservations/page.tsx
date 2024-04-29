import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmpltyState from "../components/EmptyState";
import ReservationClient from "./_components/reservation-client";

const reservation = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return (
			<ClientOnly>
				<EmpltyState title="Unathorized" subtitle="Please Login" />
			</ClientOnly>
		);
    }
    const reservations = await getReservation({ authorId: currentUser.id })
    if (!reservations || reservations.length === 0) {
        return (
            <ClientOnly>
                <EmpltyState
                    title="You don't have any reservations yet"
                    subtitle="Looks like you have not added any reservations yet. Click the heart icon on any listing to add it to your reservations."
                />
            </ClientOnly>
        );
    }
	return (
		<ClientOnly>
			<ReservationClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default reservation;
