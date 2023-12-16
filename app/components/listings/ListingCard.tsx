"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import useCountries from "@/app/hooks/useCountries";

import Button from "../Button";
import HeartButton from "../HeardButton";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { User , Listing, Reservation} from "@prisma/client";
interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: User| null;
	color?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
	currentUser,
	color,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) {
				return;
			}

			onAction?.(actionId);
		},
		[disabled, onAction, actionId]
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div>
			{isLoading ? (
				<div>
					<div className="flex flex-col gap-2 w-full">
						<div
							className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
						>
							<Skeleton height={500} style={{ backgroundColor: "#f2f2f2" }} />
						</div>
						<Skeleton
							width={150}
							height={20}
							style={{ backgroundColor: "#f2f2f2" }}
						/>
						<Skeleton
							width={100}
							height={15}
							style={{ backgroundColor: "#f2f2f2" }}
						/>
						<Skeleton
							width={120}
							height={15}
							style={{ backgroundColor: "#f2f2f2" }}
						/>
						<Skeleton
							width={80}
							height={15}
							style={{ backgroundColor: "#f2f2f2" }}
						/>
					</div>
				</div>
			) : (
				<div
					onClick={() => router.push(`/listings/${data.id}`)}
					className="col-span-1 cursor-pointer group"
				>
					<div className="flex flex-col gap-2 w-full">
						<div
							className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
						>
							<Image
								fill
								className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
								src={data.imageSrc}
								alt="Listing"
							/>
							<div
								className="
            absolute
            top-3
            right-3
          "
							>
								<HeartButton listingId={data.id} currentUser={currentUser} />
							</div>
						</div>
						<div className="font-semibold text-lg">
							{location?.region}, {location?.label}
						</div>
						<div className="font-light text-neutral-500">
							{reservationDate || data.category}
						</div>
						<div className="flex flex-row items-center gap-1">
							<div className="font-semibold">$ {price}</div>
							{!reservation && <div className="font-light">night</div>}
						</div>
						{onAction && actionLabel && (
							<Button
								disabled={disabled}
								small
								label={actionLabel}
								onClick={handleCancel}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ListingCard;
