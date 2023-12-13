"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/calendar";

interface ListingReservationProps {
	totalPrice: number;
	price: number;
	disabledDates: Date[];
	onChangeDate: (value: Range) => void;
	dateRange: Range;
	disabled?: boolean;
	onSubmit: () => void;
}

const ListingReservation = ({
	totalPrice,
	price,
	disabledDates,
	onChangeDate,
	dateRange,
	disabled,
	onSubmit,
}: ListingReservationProps) => {
	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
			<div className="flex items-center gap-1 p-4">
				<div className="font-semibold text-2xl">${price}</div>
				<div className="text-neutral-600 font-light">/ night</div>
			</div>
			<hr />

			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={(value) => onChangeDate(value.selection)}
			/>

			<hr />
			<div className="p-4">
				<Button disabled={disabled} label="Reserve" onClick={onSubmit} />
			</div>
			<hr />
			<div className="p-4 flex items-center justify-between font-semibold text-lg ">
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	);
};

export default ListingReservation;
