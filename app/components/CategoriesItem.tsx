"use client";


import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoriesItemProps {
    select?: boolean;
    label: string;
    icon: IconType;
    description?: string;
}


const CategoriesItem = ({
    select,
    label,
    icon: Icon,
    description,
}: CategoriesItemProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };
        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }
        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true, skipEmptyString: true });
        router.push(url);
    }, [params, router, label]);

    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 text-center mt-4 opacity-75 hover:opacity-100 
        ${select ? `border-b-neutral-800 : border-transparent` : `border-transparent`}
        ${select ? `text-neutral-800` : `text-neutral-500`}

        `}>
            <Icon size={30} />
            <div className="font-medium text-xl">{label}</div>
        </div>
       
);
}
 
export default CategoriesItem;