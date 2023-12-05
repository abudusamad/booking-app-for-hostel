import Image from "next/image";

const Logo = () => {
    return (<Image
        src="/logo.svg"
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width={50}
        height={50}
    
    />);
}
 
export default Logo;