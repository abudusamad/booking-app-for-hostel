import { Nunito } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "./components/Navbar/navbar";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {	
		default: siteConfig.name,
		template:`%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/logo.svg",
			href:"/logo.svg",
		}
	]
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
