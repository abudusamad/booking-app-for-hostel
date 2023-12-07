import { User } from "@prisma/client";
import { Container } from "../Containter";
import Categories from "./categories";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

interface NavbarProps {
	currentUser?: User | null;
}

const Navbar = ({currentUser}:NavbarProps) => {
	return (
		<div className="fixed z-40 w-full shadow-sm  bg-white ">
			<div className="border-b-[1px]  py-4">
				<Container>
					<div className="flex items-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;
