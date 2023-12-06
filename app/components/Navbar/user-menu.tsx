"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import MenuItem from "./menu-item";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const togggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);
	return (
		<div className="relative">
			<div className="flex items-center gap-3">
				<div className="text-semibold px-4 py-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-sm hidden md:block">
					Airbnb your home
				</div>
				<div
					onClick={togggleOpen}
					className="flex items-center gap-4 rounded-full border-[1px] border-neutral-200 px-3 p-2 shadow-sm hover:shadow-md transition cursor-pointer"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="
                absolute rounded-xl shadow-md w-[20vw] md:3/4 bg-white overflow-hidden right-0 top-12 text-sm z-10
                "
				>
					<div className="flex flex-col cursor-pointer">
						<MenuItem label="Log In" onclick={() => {}} icon={MdOutlineLogout} />
						<MenuItem label="Logout" onclick={() => {}}  icon={MdOutlineLogin}/>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
