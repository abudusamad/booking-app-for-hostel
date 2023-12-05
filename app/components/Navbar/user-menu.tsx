import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";

const UserMenu = () => {
    return (<div className="relative">
        <div className="flex items-center gap-3">
            <div className="text-semibold px-4 py-2 rounded-full hover:bg-neutral-100 transition cursor-pointer text-sm hidden md:block">
                Airbnb your home

            </div>
            <div className="flex items-center gap-4 rounded-full border-[1px] border-neutral-200 px-3 p-2 shadow-sm hover:shadow-md transition cursor-pointer">
                <AiOutlineMenu />
                <Avatar/>
                
            </div>

        </div>
        
    </div> );
}
 
export default UserMenu;