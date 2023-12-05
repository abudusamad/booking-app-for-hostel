import { Container } from "../Containter";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

const Navbar = () => {
	return (
		<div className="fixed z-50 w-full shadow-sm  bg-white border-b-[1px]  py-4">
			<Container>
				<div className="flex items-center justify-between gap3 md:gap-0">
					<Logo />
                    <Search />
                    <UserMenu/>
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
