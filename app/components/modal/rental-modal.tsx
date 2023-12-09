"use client";

import { useMemo, useState } from "react";
import { categories } from "@/app/components/Navbar/categories";

import useRentalModal from "@/app/hooks/useRentalModal";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Modal from "./modal";
import CategoryCard from "../inputs/category-card";

enum STEPS {
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
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		if (step === STEPS.CATEGORY) {
			rentalModal.onClose();
		} else {
			setStep((value) => value - 1);
		}
	};

	const onNext = () => {
		if (step === STEPS.PRICE) {
			setIsLoading(true);
		} else {
			setStep((value) => value + 1);
		}
	};
	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}
		return "Next";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category that best describes your property"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((category) => (
					<div key={category.label}>
						<CategoryCard
							label={category.label}
							icon={category.icon}
							description={category.description}
							selected={category.label === "Caves"}
							onClick={() => {}}
						/>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentalModal.isOpen}
			title="Airbnb your home"
			actionLabel={actionLabel}
			onClose={rentalModal.onClose}
			onSubmit={onNext}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
};

export default RentalModal;
