"use client";

import { categories } from "@/app/components/Navbar/categories";
import { useEffect, useMemo, useState } from "react";

import useRentalModal from "@/app/hooks/useRentalModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import CategoryCard from "../inputs/category-card";
import Counter from "../inputs/counter";
import ContrySelect from "../inputs/country-select";
import ImageUpload from "../inputs/image-upload";
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
	const [isMounted, setIsMounted] = useState(false);
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		watch,
	} = useForm<FieldValues>({
		defaultValues: {
			category: " ",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: " ",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[]
	);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back";
	}, [step]);

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

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}
		setIsLoading(true);

		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Listing created successfully");
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentalModal.onClose();
			})
			.catch(() => {
				toast.error("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

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
			<div className="flex flex-col gap-4">
				<Heading
					title="Where's your place located?"
					subtitle="Guests will only get your exact address once they've booked a reservation."
				/>
				<ContrySelect
					value={location}
					onChange={(value) => setCustomeValue("location", value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="What's the name of your place?"
					subtitle="What amenities do you offer?"
				/>
				<Counter
					onChange={(value) => setCustomeValue("guestCount", value)}
					value={guestCount}
					title="Guest"
					subtitle="How many guests can your place accommodate?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomeValue("roomCount", value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many guests can your place accommodate?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomeValue("bathroomCount", value)}
					value={bathroomCount}
					title="Bathroom"
					subtitle="How many guests can your place accommodate?"
				/>
			</div>
		);
	}
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-4">
				<Heading
					title="Upload some photos"
					subtitle="Guests love to see photos of your place before they book"
				/>
				<ImageUpload
					onChange={(value) => setCustomeValue("imageSrc", value)}
					value={imageSrc}
				/>
			</div>
		);
	}
	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-4">
				<Heading
					title="Describe your place to guests"
					subtitle="Tell guests what you love about the space. You can also tell them about the neighborhood."
				/>
				<Input
					id="title"
					label="Title"
					register={register}
					errors={errors}
					required
					disabled={isLoading}
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					register={register}
					errors={errors}
					required
					disabled={isLoading}
				/>
			</div>
		);
	}
	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How much do you want to charge?"
					subtitle="We can help you set the right price for your space."
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					register={register}
					errors={errors}
					type="number"
					disabled={isLoading}
					required
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
			secondaryActionLabel={secondaryActionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
};

export default RentalModal;
