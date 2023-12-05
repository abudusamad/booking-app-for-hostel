import Image from "next/image";

const Logo = () => {
    return (<Image
        src="/images/logo.png"
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width={100}
        height={100}
    
    />);
}
 
export default Logo;