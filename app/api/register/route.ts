import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, phone, password } = body;

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				phone,
				hashedPassword,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		console.log("[REGISTER_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
