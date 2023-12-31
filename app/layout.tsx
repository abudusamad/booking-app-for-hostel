import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar/navbar";
import "./globals.css";
import ModalProvider from "./providers/modalProvider";
import ToastProvider from "./providers/toastprovider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/logo.png",
			href: "/logo.png",
		},
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientOnly>
					<ToastProvider />
					<ModalProvider />
					<Navbar currentUser={currentUser} />
					<main className="pb-20 pt-28">{children}</main>
				</ClientOnly>
			</body>
		</html>
	);
}
