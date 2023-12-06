import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Navbar from "./components/Navbar/navbar";
import Modal from "./components/modal/modal";
import "./globals.css";
import ModalProvider from "./providers/modalProvider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/logo.svg",
			href: "/logo.svg",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ModalProvider/>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
