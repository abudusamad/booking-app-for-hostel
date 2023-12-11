"use client";

import { Container } from "@/app/components/Containter";
import { categories } from "@/app/components/Navbar/categories";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingHead from "@/app/components/listings/ListtingHead";
import { SafeListing, SafeUser } from "@/types";
import { useMemo } from "react";

interface ListingClientProps {
	currentUser?: SafeUser | null;
	listing: SafeListing & {
		user: SafeUser;
	};
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
	const category = useMemo(() => {
		return categories.find((category) => category.label === listing.category);
	}, [listing.category]);

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
