"use client";

import { Container } from "@/app/components/Containter";
import ListingCard from "@/app/components/listings/ListingCard";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationClientProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

const ReservationClient = ({
	reservations,
	currentUser,
}: ReservationClientProps) => {
	const router = useRouter();

	const [deleteId, setDeleteId] = useState(" ");

	const onCancel = useCallback(
		(id: string) => {
			setDeleteId(id);
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reservation deleted successfully");
					router.refresh();
				})
				.catch(() => {
					toast.error("Something went wrong");
				})
				.finally(() => {
					setDeleteId("");
				});
		},
		[router]
	);

	return (
		<Container>
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation}
						currentUser={currentUser}
						actionId={reservation.id}
						disabled={deleteId === reservation.id}
						actionLabel="Cancel reservation"
						onAction={onCancel}
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationClient;
