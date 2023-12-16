import prisma from "@/lib/prismadb";

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
} 
export default async function getListings(params: IListingsParams = {} ) {
	try {
		 const {
				userId,
				roomCount,
				guestCount,
				bathroomCount,
				locationValue,
				startDate,
				endDate,
				category,
			} = params;

			let query: any = {};

			if (userId) {
				query.userId = userId;
			}

			if (category) {
				query.category = category;
			}

			if (roomCount) {
				query.roomCount = {
					gte: +roomCount,
				};
			}

			if (guestCount) {
				query.guestCount = {
					gte: +guestCount,
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
			query.reservations = {
				every: {
					OR: [
						{
							AND: [
								{
									endDate: { lte: startDate },
								},
								{
									userId: { not: userId }, // Ensure it's not the same user
								},
							],
						},
						{
							AND: [
								{
									startDate: { gte: endDate },
								},
								{
									userId: { not: userId }, // Ensure it's not the same user
								},
							],
						},
					],
				},
			};
		}



		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "asc",
			},
		});
		return listings;

	} catch (error: any) {
		throw new Error(error);
	}
}
