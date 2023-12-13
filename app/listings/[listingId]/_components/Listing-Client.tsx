"use client";

import { Container } from "@/app/components/Containter";
import { categories } from "@/app/components/Navbar/categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingHead from "@/app/components/listings/ListtingHead";
import useCountries from "@/app/hooks/useCountries";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

interface ListingClientProps {
	currentUser?: SafeUser | null;
	listing: SafeListing & {
		user: SafeUser;
	};
	reservation?: SafeReservation[];
	locationValue?: string | null;
}

const ListingClient = ({
	listing,
	currentUser,
	reservation,
	locationValue,
}: ListingClientProps) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue || "")?.latlng

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
	const [totalPrice, setTotalPrice] = useState(listing.price);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			.then(() => {
				toast.success("Reservation created successfully");
				setDateRange(initialDateRange);
				router.push("/trips");
			})
			.catch(() => {
				toast.error("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [currentUser, dateRange, listing, loginModal, router, totalPrice]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(
				dateRange.endDate,
				dateRange.startDate
			);
			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);

			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

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
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-auto mt-6 ">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							bathroomCount={listing.bathroomCount}
							guestCount={listing.guestCount}
							locationValue={listing.locationValue}
						/>
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disableDataes}
							/>
						</div>
					</div>
					<Map  center={coordinates}/>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
