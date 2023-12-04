import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar/navbar";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "booking app",
	description: "Cool place to book stuff",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
		</html>
	);
}
