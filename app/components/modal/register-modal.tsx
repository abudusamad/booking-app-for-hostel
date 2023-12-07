"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			phone: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				console.log("success");
				registerModal.onClose();

				setIsLoading(true);
			})
			.catch(() => {
				console.log("error");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = <div className="flex flex-col gap-4"></div>;
	return <div></div>;
};

export default RegisterModal;
