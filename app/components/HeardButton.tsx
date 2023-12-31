import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { SafeUser } from "@/types";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});
	return (
		<div
			onClick={toggleFavorite}
			className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
		>
			<AiOutlineHeart
				size={26}
				className="absolute -right-2 -top-2 text-white "
			/>
			<AiFillHeart
				size={30}
				className={`absolute -right-2 -top-2 ,
          ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
			/>
		</div>
	);
};

export default HeartButton;
