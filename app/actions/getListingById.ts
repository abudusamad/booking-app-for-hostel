import prisma from "@/lib/prismadb";

export default async function getListingById({
	params,
}: {
	params: { listingId: string };
}) {
	try {
		if (!params || !params.listingId) {
			throw new Error("Invalid parameters");
		}
		const { listingId } = params;

		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId,
			},
			include: {
				user: true,
			},
		});
		if (!listing) {
			return {
				status: 404,
				message: `No listing found for id: ${listingId}`,
			};
		}
		return listing;
	} catch (error: any) {
		throw new Error(error);
	}
}
