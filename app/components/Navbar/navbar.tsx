import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import Usermenu from "./Usermenu";

const Navbar = () => {
	return (
		<div className="fixed z-50  w-full bg-white shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <Usermenu/>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;
