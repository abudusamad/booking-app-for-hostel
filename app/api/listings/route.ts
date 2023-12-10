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
		if (typeof body !== "object" || body === null) {
			return new NextResponse("Invalid request body", { status: 400 });
		}

		const properties = [
			"title",
			"description",
			"imageSrc",
			"category",
			"roomCount",
			"bathroomCount",
			"guestCount",
			"location",
			"price",
		];

		for (const prop of properties) {
			if (!body.hasOwnProperty(prop)) {
				return new NextResponse(`Missing required field: ${prop}`, {
					status: 400,
				});
			}
		}

		const {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			location,
			price,
		} = body;

		if (
			typeof title !== "string" ||
			typeof description !== "string" ||
			typeof imageSrc !== "string" ||
			typeof category !== "string" ||
			typeof roomCount !== "number" ||
			typeof bathroomCount !== "number" ||
			typeof guestCount !== "number" ||
			typeof location !== "object" ||
			location === null ||
			typeof price !== "string"
		) {
			return new NextResponse("Invalid request body", { status: 400 });
		}

		const listing = await prisma.listing.create({
			data: {
				title,
				description,
				imageSrc,
				category,
				roomCount,
				bathroomCount,
				guestCount,
				locationValue: location.value,
				price: parseInt(price, 10),
				userId: currentUser.id,
			},
		});

		return NextResponse.json(listing);
	} catch (error) {
		console.error("[ERROR] [POST] [/api/listings]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
