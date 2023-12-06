"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	actionLabel?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal = ({
	isOpen,
	onClose,
	title,
	onSubmit,
	actionLabel,
	body,
	footer,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}: ModalProps) => {
	const [showModal, setShowModal] = useState(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return null;
		}
		onSubmit();
	}, [onSubmit, disabled]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) {
			return;
		}
		secondaryAction();
	}, [secondaryAction, disabled]);
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed flex items-center justify-center z-50 inset-0 outline-none focus:outline-none bg-black/80 overflow-x-hidden overflow-y-auto">
			<div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto ">
				<div
					className={`translate duration-300 h-full,
					${showModal ? "translate-y-0" : "translate-y-full"}
				${showModal ? "opacity-100" : "opacity-0"}`}
				>
					<div className="translate h-full lg:h-auto md:h-auto rounded-lg border-0 shadow-lg relative flex flex-col bg-white w-full outline-none focus:outline-none px-2">
						<div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
							<button
								className="absolute left-4 p-1 hover:opacity-70 border-0 transition"
								onClick={handleClose}
							>
								<IoMdClose size={18} />
							</button>
						</div>
						<div className="font-semibold text-lg">{title}</div>
						<div className="flex p-6 flex-auto text-lg">{body}</div>
						<div className="flex flex-col gap-2 p-6">
							<div className="flex items-center gap-4 w-full">
								{secondaryAction && secondaryActionLabel && (
									<Button
										disabled={disabled}
										label={secondaryActionLabel}
										outline
										onClick={handleSecondaryAction}
									/>
								)}
								<Button disabled={disabled} label={actionLabel} />
							</div>
							{footer}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Modal;
