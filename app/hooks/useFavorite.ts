import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/types";

interface IUseFavorite {
	listingId: string;
	currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = currentUser?.favoriteIds?.includes(listingId) || false;

	const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();

		if (!currentUser) {
			return loginModal.onOpen();
		}

		try {
			if (hasFavorited) {
				await axios.delete(`/api/favorites/${listingId}`);
			} else {
				await axios.post(`/api/favorites/${listingId}`);
			}

			router.refresh();
			toast.success("Success");
		} catch (error) {
			toast.error("Something went wrong.");
		}
	};

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
