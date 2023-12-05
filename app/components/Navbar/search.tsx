import { BiSearch } from "react-icons/bi";

const Search = () => {
	return (
		<div className="w-full md:w-auto border-[1px] rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex items-center justify-between py-2">
				<div className=" font-semibold text-sm px-6  ">Anywhere</div>
				<div className="hidden sm:block flex-1 text-center font-semibold border-x-[1px] px-6">
					Any week
				</div>
				<div className="tex-sm pl-6 p-2 text-gray-600 flex items-center gap-3">
					<div className="hidden sm:block">Add guests</div>
					<div className="rounded-full bg-rose-500 flex text-white p-2 ">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
