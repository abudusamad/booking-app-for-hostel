import { create } from "zustand";

interface RegisterModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
	isOpen: true,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));

export default useRegisterModal;