"use client";

import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined;

}

const Avatar = ({src}:AvatarProps) => {
    return (
        <Image
            className="rounded-full object-cover" 
            height="30"
            width="30"
            alt="avatar"
            src={src ||'/images/placeholder.jpg'}
        
        />
      )
}
 
export default Avatar;