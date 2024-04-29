"use client";

import { format } from "path";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";


interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input = ({
    id,
    label,
    type = "text",
    disabled ,
    formatPrice,
    required ,
    register,
    errors,
}:InputProps) => {
    return (
			<div className="w-full relative">
				{formatPrice && (
					<BiDollar
						size={25}
						className="
                    
                top-5
                left-3
                text-neutral-700
                    "
					/>
				)}
				<input
					{...register(id, {
						required
					})}
					type={type}
					id={id}
					placeholder=" "
					disabled={disabled}
					className={`peer
                w-full
                p-4
                pt-6
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${formatPrice ? "pl-9" : "pl-4"}
                ${errors[id] ? "border-rose-500" : "border-neutral-500"}
                ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}

                `}
				/>
            <label
                className={
                    `
                    
                    absolute
                    text-md
                    duration-150
                   -translate-y-3
                   top-5
                   z-10
                   origin-[0]
                   ${formatPrice ? "left-9" : "left-4"}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? "text-rose-500" : "text-neutral-500"}


                    `
                }
            >{label}</label>
			</div>
		);
}
 
export default Input;