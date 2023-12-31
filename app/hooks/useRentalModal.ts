import { create } from "zustand";

interface RentalModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useRentalModal = create<RentalModalStore>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));

export default useRentalModal;
