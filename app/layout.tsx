import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Navbar from "./components/Navbar/navbar";
import CientOnly from "./components/clientOnly";
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
				
					<ToastProvider />
					<ModalProvider />
					<Navbar />
			
				{children}
			</body>
		</html>
	);
}
