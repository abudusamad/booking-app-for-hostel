"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;

    
}

const Button = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
}:ButtonProps) => {
    return ( 
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                ${outline ? "border-[1px] border-neutral-500 text-neutral-500" : "bg-neutral-500 text-white"}
                ${small ? "px-2 py-1 text-sm" : "px-4 py-2 text-lg"}
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-70 transition"}
                rounded-lg flex items-center gap-2
            `}
        >
            {Icon && <Icon />}
            {label}
        </button>
     );
}
 
export default Button;