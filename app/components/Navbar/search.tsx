"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const { getByValue } = useCountries();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount =params?.get("guestCount");

	const locationLabel = useMemo(() => {
		if (locationValue) {
			return getByValue(locationValue as string)?.label;
		}
		return "Anywhere";
	}, [locationValue, getByValue])
	
	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate as string);
			const end = new Date(endDate as string);	
			let diff = differenceInDays(end, start);
			if (diff === 0) {
				diff = 1;
			}
			return `${diff} night${diff > 1 ? "s" : ""}`;
		}
		return "Any week";	
	}, [startDate, endDate]);

	const guestLabel = useMemo(() => {
		if (guestCount) {
			return `${guestCount}  Guest`;
		}
		return "Add guests";
	}, [guestCount]);
	return (
		<div onClick={searchModal.onOpen} className="w-full md:w-auto border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex  items-center justify-between py-2">
				<div className="text-xl px-6 hidden	md:block  ">
					{locationLabel}
				</div>
				<div className="hidden md:block text-xl flex-1 text-center  border-x-[1px] px-6">
					{durationLabel}
				</div>
				<div className="text-xl pl-6 p-2 text-gray-600 flex items-center gap-3">
					<div className="hidden sm:block">{ guestLabel}</div>
					<div className="rounded-full bg-rose-500 hidden md:block text-white p-2 ">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
