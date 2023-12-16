"use client";

import useCountries from "@/app/hooks/useCountries";

import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../Heading";
import HeartButton from "../HeardButton";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { User } from "@prisma/client";

interface ListingHeadProps {
	title: string;
	imageSrc: string;
	locationValue: string;
	id: string;
	currentUser?: User | null;
}

const ListingHead = ({
	title,
	imageSrc,
	locationValue,
	id,
	currentUser,
}: ListingHeadProps) => {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div>
			{isLoading ? (
				<div>
					<Skeleton width={1000} height={700} />
					
				</div>
			) : (
				<div>
					<Heading
						title={title}
						subtitle={`${location?.region}, ${location?.label}-${location?.capital}`}
					/>
					<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
						<Image
							src={imageSrc}
							fill
							className="object-cover w-full"
							alt="Image"
						/>
						<div className="absolute top-5 right-5">
							<HeartButton listingId={id} currentUser={currentUser} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ListingHead;
