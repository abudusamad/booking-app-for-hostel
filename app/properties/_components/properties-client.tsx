"use client";

import { Container } from "@/app/components/Containter";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface PropertiesClientProps {
	listings: Listing[];
	currentUser?: User | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
	const [deleteId, setDeleteId] = useState("");
	const router = useRouter();

	const onDelete = useCallback(
		(id: string) => {
			setDeleteId(id);
			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success("Listing deleted successfully");
					router.refresh();
				})
				.catch((error) => {
					toast.error(error.response?.data?.message);
				})
				.finally(() => {
					setDeleteId("");
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Properties" subtitle="List of your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
				{listings.map((listing: any) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
						actionId={listing.id}
						disabled={deleteId === listing.id}
						actionLabel="Delete property"
						onAction={onDelete}
					/>
				))}
			</div>
		</Container>
	);
};

export default PropertiesClient;
