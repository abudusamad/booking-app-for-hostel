import Image from "next/image";
interface AvatarProps {
	src?: string | null| undefined;
}

export const Avatar = ({ src }: AvatarProps) => {
	return (
		<Image
			src={src || "/images/placeholder.jpg"}
			alt="Avatar"
			className="rounded-full cursor-pointer"
			width={35}
			height={35}
		/>
	);
};
