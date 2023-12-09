"use client";

import { categories } from "@/app/components/Navbar/categories";
import { useMemo, useState } from "react";

import useRentalModal from "@/app/hooks/useRentalModal";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import CategoryCard from "../inputs/category-card";
import ContrySelect from "../inputs/country-select";
import Modal from "./modal";

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<FieldValues>({
		mode: "onBlur",
	});

	const category = watch("category");
	const location = watch("location");

	const setCustomeValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

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
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryCard
							label={item.label}
							icon={item.icon}
							description={item.description}
							selected={category === item.label}
							onClick={(category) => setCustomeValue("category", category)}
						/>
					</div>
				))}
			</div>
		</div>
	);
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div>
				<Heading
					title="Where's your place located?"
					subtitle="Guests will only get your exact address once they've booked a reservation."
				/>
				<ContrySelect
					value={location}
					onChange={(value) => setCustomeValue("location", value)}
				/>
			</div>
		);
	}

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
