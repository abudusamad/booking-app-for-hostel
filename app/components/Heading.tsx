"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface HeadingProps {
	title: string;
	subtitle: string;
	center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={center ? "text-center" : "text-start"}>
			{isLoading ? (
				<div>
					<Skeleton width={200} height={30} />
					<Skeleton width={150} height={20} />
				</div>
			) : (
				<div>
					<div className="text-2xl font-bold">{title}</div>
					<div className="font-light text-neutral-500 mt-2">{subtitle}</div>
				</div>
			)}
		</div>
	);
};

export default Heading;
