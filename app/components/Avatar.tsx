import Image from "next/image";
interface AvatarProps {
	src?: string | null;
}

export const Avatar = ({ src }: AvatarProps) => {
	return (
		<Image
			src="/images/placeholder.jpg"
			alt="Avatar"
			className="rounded-full cursor-pointer"
			width={35}
			height={35}
		/>
	);
};
