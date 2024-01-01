"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentalModal from "@/app/hooks/useRentalModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import FormPopover from "../form-popoover";
import MenuItem from "./menu-item";

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentalModal = useRentalModal();

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		rentalModal.onOpen();
	}, [currentUser, loginModal, rentalModal]);

	const menuItems = [
		{ label: "My trips", path: "/trips" },
		{ label: "My favorites", path: "/favorites" },
		{ label: "My reservation", path: "/reservations" },
		{ label: "My properties", path: "/properties" },
		{ label: "Airbnb your home", action: rentalModal.onOpen },
	];

	const renderMenuItems = (items: any) =>
		items.map((item: any, index: any) => (
			<MenuItem
				key={index}
				label={item.label}
				onClick={item.path ? () => router.push(item.path) : item.action}
			/>
		));

	return (
		<div className="relative">
			<div className="flex items-center gap-3">
				<div
					onClick={onRent}
					className="text-semibold px-4 py-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-xl hidden md:block"
				>
					Airbnb your home
				</div>
				<div className="flex items-center gap-4 rounded-full border-[1px] border-neutral-200 px-3 p-2 shadow-sm hover:shadow-md transition cursor-pointer">
					<AiOutlineMenu />
					{currentUser && (
						<FormPopover
							content={
								<>
									{renderMenuItems(menuItems)}
									<hr />
									<MenuItem label="Logout" onClick={signOut} />
								</>
							}
						>
							<div className="hidden md:block">
								<Avatar src={currentUser?.image} />
							</div>
						</FormPopover>
					)}
					{!currentUser && (
						<FormPopover
							content={
								<div>
									<MenuItem label="Log In" onClick={loginModal.onOpen} />
									<MenuItem label="Sign Up" onClick={registerModal.onOpen} />
								</div>
							}
						>
							<div className="hidden md:block">
								<Avatar />
							</div>
						</FormPopover>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
