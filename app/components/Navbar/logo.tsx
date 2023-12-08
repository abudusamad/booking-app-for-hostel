"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (<Image
        src="/images/logo.png"
        alt="Logo"
        className="hidden md:block cursor-pointer"
        width={150}
        height={150}
        onClick={() => router.push("/")}
    
    />);
}
 
export default Logo;