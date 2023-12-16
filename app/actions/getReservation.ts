import prisma from "@/lib/prismadb";
import { Reservation } from "@prisma/client";

interface IParams {
	listingId?: string;
	authorId?: string;
	listing?: { userId: string };
	userId?: string;
	reservationId?: string;
}

export default async function getReservation(params: IParams) {
	try {
		const { listingId, authorId, listing, userId, reservationId } = params;
		const query: IParams = {};
		if (listingId) {
			query.listingId = listingId;
		}
		if (authorId) {
			query.authorId = authorId;
		}
		if (listing) {
			query.listing = listing;
		}
		if (userId) {
			query.userId = userId;
		}
		const reservations = await prisma.reservation.findMany({
			where: {
				listingId: query.listingId,
				id: query.reservationId,
			},
	
			include: {
				listing: true,
				user: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
		return reservations;
		
	} catch (error: any) {
		console.error("Error in getReservations:", error);
		throw new Error("An error occurred while fetching reservations.");
	}
}
