"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { get } from "http";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { act } from "react-dom/test-utils";

import {format} from "date-fns";
import Image from "next/image";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    curentUser?: SafeUser | null;
}

const ListingCard = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId,
    curentUser,
}: ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        

        if (disabled || !actionId) {
            return
        }
        onAction?.(actionId)
    }, [disabled, onAction, actionId])
    
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);

        return `${format(startDate, "dd MMM yyyy")} - ${format(endDate, "dd MMM yyyy")}`;
    }, [reservation]);

    return (  
        <div className="col-span-1 cursor-pointer group">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                    fill
                    src={data.imageSrc}
                    alt="listing"
                    className="oject-cover h-full w-full group-hover:scale-110 transition-all duration-200"
                
                />
                <div >
                    <HeartButton
                        listingId={data.id} 
                        curentUser={curentUser}
                    
                    />

                </div>

            </div>
        </div>
    );
}
 
export default ListingCard;