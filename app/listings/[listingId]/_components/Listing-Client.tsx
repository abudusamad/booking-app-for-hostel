import { Container } from "@/app/components/Containter";
import ListingHead from "@/app/components/listings/ListtingHead";
import { SafeListing, SafeUser } from "@/types";

interface ListingClientProps {
	currentUser?: SafeUser | null;
	listing: SafeListing & {
		user: SafeUser;
	};
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
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
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
