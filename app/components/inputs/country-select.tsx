import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
	label: string;
	value: string;
	region: string;
	flag: string;
	latlng: number[];
	capital: string[];
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
	const { getAll } = useCountries();
	return (
		<div>
			<Select
				value={value}
				isClearable
				onChange={(value) => onChange(value as CountrySelectValue)}
				options={getAll()}
				getOptionLabel={(option) => option.label}
				getOptionValue={(option) => option.value}
				placeholder="Select a country"
				isSearchable
				formatOptionLabel={(option: any) => (
					<div className="flex items-center gap-3">
						<div>{option.flag}</div>
						<div>
							{option.label}
							<span className="text-neutral-500 ml-2">{option.region}</span>
						</div>
						<span className="text-neutral-500 ml-2">{option.capital}</span>
					</div>
				)}
				classNames={{
					control: () => "p-3 border-2 border-neutral-200 rounded-xl",
					option: () => "text-xl",
					input: () => "text-xl",
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary25: "#f9f9f9",
						primary: "black",
					},
				})}
			/>
		</div>
	);
};

export default CountrySelect;
