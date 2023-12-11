import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import getFavoriteListing from "../actions/getFavoriteListing";
import useFavorite from "../hooks/useFavorite";
import { list } from "postcss";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId, currentUser
    })
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
        size={20}
        className="
          fill-white
          absolute
          ml-2
        -right-1
        -top-2
        "
      />
            <AiFillHeart
                size={28}
                className={`absolute -right-2 -top-2 ,
          ${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`
        }
      />
    </div>
   );
};

export default HeartButton;
