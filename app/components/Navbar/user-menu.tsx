"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentalModal from "@/app/hooks/useRentalModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import FormPopover from "../form-popoover";
import MenuItem from "./menu-item";

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
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

	const togggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);
	return (
		<div className="relative">
			<div className="flex items-center gap-3">
				<div
					onClick={onRent}
					className="text-semibold px-4 py-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-xl hidden md:block"
				>
					Airbnb your home
				</div>
				<div
					onClick={togggleOpen}
					className="flex items-center gap-4 rounded-full border-[1px] border-neutral-200 px-3 p-2 shadow-sm hover:shadow-md transition cursor-pointer"
				>
					<AiOutlineMenu />
					{currentUser && (
						<FormPopover
							content={
								<>
									<MenuItem
										label="My trips"
										onClick={() => router.push("/trips")}
									/>
									<MenuItem
										label="My favorites"
										onClick={() => router.push("/favorites")}
									/>
									<MenuItem
										label="My reservation"
										onClick={() => router.push("/reservations")}
									/>
									<MenuItem
										label="My properties"
										onClick={() => router.push("/properties")}
									/>
									<MenuItem
										label="Airbnb your home"
										onClick={rentalModal.onOpen}
									/>
									<hr />
									<MenuItem label="Layout" onClick={signOut} />
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
