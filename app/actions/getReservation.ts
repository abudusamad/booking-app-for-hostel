import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function getReservation(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const { reservationId } = req.query;

		if (!reservationId) {
			return res.status(400).json({ error: "Missing reservationId" });
		}

		const reservation = await prisma.reservation.findUnique({
            where: { id: String(reservationId) },
            include: {
                listing: true,
            },
		});

		if (!reservation) {
			return res.status(404).json({ error: "Reservation not found" });
		}

		return res.status(200).json(reservation);
	}

	// Handle any other HTTP methods
	res.setHeader("Allow", ["GET"]);
	res.status(405).end(`Method ${req.method} Not Allowed`);
}
