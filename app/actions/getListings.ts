import prisma from "@/lib/prismadb";

export interface IListingParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}
export default async function getListings(params: IListingParams) {
	try {
		if (!params) {
			return [];
		}
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			locationValue,
			category,
		} = params;
		
		let query: any = {};
		
		if (typeof startDate !== "string" || typeof endDate !== "string") {
			throw new Error("Invalid input");
		}

		if (
			isNaN(new Date(startDate).getTime()) ||
			isNaN(new Date(endDate).getTime())
		) {
			throw new Error("Invalid date format");
		}
		if (userId) {
			query.userId = userId;
		}
		if (category) {
			query.category = category;
		}
		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (params.guestCount) {
			const guestCountNumber = parseInt(params.guestCount as unknown as string, 10);
			if (!isNaN(guestCountNumber)) {
				query.guestCount = {
					gte: guestCountNumber,
				};
			} else {
				throw new Error("Invalid guestCount. Must be a number.");
			}
		}
		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}
		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate },
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate },
							},
						],
					},
				},
			};
		}
		const listings = await prisma.listing.findMany({
			orderBy: {
				createdAt: "asc",
			},
			select: {
				createdAt: true,
			},
		});

		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}
