"use client";

import { useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
}

const ClientOnly = ({ children }: Props) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}
	return <>{children}</>;
};

export default ClientOnly;
