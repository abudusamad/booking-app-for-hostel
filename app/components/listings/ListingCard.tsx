"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { format } from "date-fns";
import Image from "next/image";
import Button from "../Button";
import HeartButton from "../HeardButton";

interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
}

const ListingCard = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId,
	currentUser,
}: ListingCardProps) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled || !actionId) {
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

		const startDate = new Date(reservation.startDate);
		const endDate = new Date(reservation.endDate);

		return `${format(startDate, "dd MMM yyyy")} - ${format(
			endDate,
			"dd MMM yyyy"
		)}`;
	}, [reservation]);

	return (
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
	);
};

export default ListingCard;
