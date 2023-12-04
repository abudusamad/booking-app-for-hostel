import Image from "next/image";

const Logo = () => {
    return (<Image
        src="/logo.svg"  alt="logo"
        className="hidden md:block cursor-pointer"
        height={30}
        width={30}
    />);
}
 
export default Logo;   