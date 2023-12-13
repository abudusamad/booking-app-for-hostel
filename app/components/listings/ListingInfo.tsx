import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import { Avatar } from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
	user?: SafeUser | null;
	description: string;
	roomCount: number;
	bathroomCount: number;
	guestCount: number;
	locationValue: string;
	category?: {
		label: string;
		icon: IconType;
		description: string;
	} | null;
}

const ListingInfo = ({
	user,
	description,
	roomCount,
	bathroomCount,
	guestCount,
	locationValue,
	category,
}: ListingInfoProps) => {
	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col  gap-2">
				<div className="text-xl font-semibold flex items-center gap-2">
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className="flex items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<div className="text-lg font-light text-neutral-500">{description}</div>
		
		</div>
	);
};

export default ListingInfo;
