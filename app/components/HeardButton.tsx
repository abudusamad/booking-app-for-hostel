import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
	const hasFavorited = true;
	const toggleFavorite = () => {};
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
        size={28}
        className="
          fill-white
          absolute
        right-2
        top-2
        "
      />
            <AiFillHeart
                size={24}
                className={`absolute right-2 top-2 ,
          ${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`
        }
      />
    </div>
   );
};

export default HeartButton;
