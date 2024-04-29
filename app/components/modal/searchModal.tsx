"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/country-select";
import Modal from "./modal";
import DatePicker from "../inputs/calendar";
import Counter from "../inputs/counter";
import queryString from "query-string";
import { formatISO, set } from "date-fns";

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
		[	
		]
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

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined
		}
		return "Back"
	}, [step])
	
	const onSubmit = useCallback(() => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = queryString.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			...dateRange,
			locationVaue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate)
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = queryString.stringifyUrl({
			url: "/",
			query: updatedQuery,
		}, { skipEmptyString: true, skipNull: true });

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);


	}, [step, onNext, dateRange, location, guestCount, roomCount, bathroomCount, params,searchModal, router]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
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
	)
	if (step === STEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add your travel dates"	
					subtitle="Add dates for accurate pricing and availability"
				/>
				<DatePicker
					value={dateRange}
					onChange={(value) => setDateRange(value as Range)}
				/>
			</div>
		)
	}
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="More info about your trip"
					subtitle="Add dates for accurate pricing and availability"
				/>

				<Counter
					onChange={(value) => setGuestCount(value)}
					value={guestCount}
					title="Guests"
					subtitle="How many guests?"
				/>
				<hr />
				<Counter
					onChange={(value) => setRoomCount(value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many room is needed?"
				/>
				<hr />
				<Counter
					onChange={(value) => setBathroomCount(value)}
					value={bathroomCount}
					title="Bathrooms"
					subtitle="How many bathroom is needed?"
				/>
				<hr />
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Filter"
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			body={bodyContent}
			actionLabel={actionaLel}
			secondaryActionLabel={secondaryActionLabel}
		/>
	);
};

export default SearchModal;
