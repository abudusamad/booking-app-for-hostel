import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: { listingId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const ownListing = await prisma.listing.findUnique({
			where: {
				id: params.listingId,
			},
			select: {
				userId: true,
			},
		});

		if (!ownListing || ownListing.userId !== currentUser.id) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const deleteListing = await prisma.listing.delete({
			where: {
				id: params.listingId,
				userId: currentUser.id,
			},
		});
		return NextResponse.json(deleteListing);
	} catch (error) {
		console.log("[ERROR_LISTING_DELETE]", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
