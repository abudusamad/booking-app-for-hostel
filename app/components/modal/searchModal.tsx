"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/country-select";
import Modal from "./modal";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const searchModal = useSearchModal();
	const router = useRouter();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.LOCATION);

	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[location]
	);

	const onBack = useCallback(() => {
		setStep((prev) => prev - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((prev) => prev + 1);
	}, []);

	const actionaLel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Search";
		}
		return "Next";
	}, [step]);

	let bodyContent = (
		<div>
			<Heading
				title="Where are you going"
				subtitle="Add dates for accurate pricing and availability"
			/>
			<CountrySelect
				onChange={(value) => setLocation(value as CountrySelectValue)}
				value={location}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Airbnb your home"
			onClose={searchModal.onClose}
			onSubmit={onNext}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			body={bodyContent}
			actionLabel={actionaLel}
		/>
	);
};

export default SearchModal;
