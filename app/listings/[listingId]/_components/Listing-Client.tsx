import { Container } from "@/app/components/Containter";
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

				</div>

			</div>
		</Container>
	)
};

export default ListingClient;
