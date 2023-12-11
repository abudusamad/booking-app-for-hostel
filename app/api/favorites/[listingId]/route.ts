import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
	req: Request,
	{ params }: { params: { listingId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { listingId } = params;
		if (!listingId) {
			return new NextResponse("Bad Request", { status: 400 });
		}

		const user = await prisma.user.update({
			where: { id: currentUser.id },
			data: { favoriteIds: { push: listingId } },
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error("[Favorites_Error]: ", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}


export async function DELETE(
	req: Request,
	{ params }: { params: { listingId: string } }
) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { listingId } = params;
		if (!listingId) {
			return new NextResponse("Bad Request", { status: 400 });
		}

		const updatedFavoriteIds = currentUser.favoriteIds.filter(
			(id) => id !== listingId
		);

		const user = await prisma.user.update({
			where: { id: currentUser.id },
			data: { favoriteIds: updatedFavoriteIds },
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error("[Favorites_Error]: ", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}