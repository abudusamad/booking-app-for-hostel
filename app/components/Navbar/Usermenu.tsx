
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

const Usermenu = () => {
    return (<div className="relative">
        <div className="flex  items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 rounded-full hover:bg-neutral-100 tranistion cursor-pointer p-4 ">
            Airbnb your home
            
            </div>
            <div className="
            p-4 md:py-1 md:px-2 border-[1px]
            border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition            ">
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar/>
                </div>
            </div>
        </div>
     
    </div> );
}
 
export default Usermenu;