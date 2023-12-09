"use client";

import { useState } from "react";

import useRentalModal from "@/app/hooks/useRentalModal";
import { useRouter } from "next/navigation";
import Modal from "./modal";

enum STEPS{
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentalModal = () => {
	const rentalModal = useRentalModal();

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentalModal.isOpen}
			title="Airbnb your home"
			actionLabel="Continue"
			onClose={rentalModal.onClose}
			onSubmit={()=>{}}

		/>
	);
};

export default RentalModal;
