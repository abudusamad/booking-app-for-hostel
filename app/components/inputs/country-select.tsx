
import Select from "react-select";

export type CountrySelectValue = {
    label: string;
    value: string;
    region: string;
    flag: string;
    latlng: number[];
};



interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const ContrySelect = ({
    value,
    onChange,
}:CountrySelectProps) => {
    return (<div>
        <Select
            value={value}
            onChange={onChange}
            options={countries}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            placeholder="Select a country"
            className="w-full"
            isSearchable
        />
        
    </div> );
}
 
export default ContrySelect