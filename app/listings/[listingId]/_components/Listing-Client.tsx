"use client";

import { Container } from "@/app/components/Containter";
import { categories } from "@/app/components/Navbar/categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingHead from "@/app/components/listings/ListtingHead";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Range } from "react-date-range";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	currentUser?: SafeUser | null;
	listing: SafeListing & {
		user: SafeUser;
	};
	reservation?: SafeReservation[];
}

const ListingClient = ({
	listing,
	currentUser,
	reservation,
}: ListingClientProps) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const disableDataes = useMemo(() => {
		let dates: Date[] = [];

		reservation?.forEach((reservation: any) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...range];
		});
		return dates;
	}, [reservation]);

	const category = useMemo(() => {
		return categories.find((category) => category.label === listing.category);
	}, [listing.category]);

	const [isLoading, setIsLoading] = useState(false);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>

					<ListingInfo
						user={listing.user}
						category={category}
						description={listing.description}
						roomCount={listing.roomCount}
						bathroomCount={listing.bathroomCount}
						guestCount={listing.guestCount}
						locationValue={listing.locationValue}
					/>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
