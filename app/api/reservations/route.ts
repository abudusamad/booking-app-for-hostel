import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const body = await req.json();

		const { listingId, startDate, endDate, totalPrice } = body;

		if (!listingId || !startDate || !endDate || !totalPrice) {
			return new NextResponse("Missing required fields", { status: 400 });
		}

		const listing = await prisma.listing.findUnique({
			where: {
				id: listingId,
			},
		});
		if (!listing) {
			return new NextResponse("Listing not found", { status: 404 });
		}

		const listingReservations = await prisma.reservation.create({
			data: {
				startDate,
				userId: currentUser.id,
				listingId,
				endDate,
				totalPrice,
			},
		});
		return NextResponse.json(listingReservations);
	} catch (error) {
		console.log("[ERROR] POST /api/reservations", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
