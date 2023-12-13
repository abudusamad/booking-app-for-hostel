import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{
		params,
	}: {
		params: { reservationId: string; listingId: string };
	}
) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const reservation = await prisma.reservation.findUnique({
			where: {
				id: params.reservationId,
				listingId: params.listingId,
			},
		});

		if (!reservation) {
			return new NextResponse("Reservation Not Found", { status: 404 });
		}

		if (reservation.userId !== currentUser.id) {
			return new NextResponse("Forbidden", { status: 403 });
		}

		await prisma.reservation.delete({
			where: {
				id: params.reservationId,
			},
		});

		return new NextResponse("Reservation deleted successfully", {
			status: 200,
		});
	} catch (error) {
		
		console.log("DELETE /reservations/[Id] ERROR: ", error);
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
