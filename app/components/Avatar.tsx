import Image from "next/image"

export const Avatar = () => {
    return (
        
        <Image
            src="/images/placeholder.jpg"
            alt="Avatar"
            className="rounded-full cursor-pointer"
            width={35}
            height={35}
        
        
        />
    )
}