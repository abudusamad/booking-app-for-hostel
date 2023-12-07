"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./modal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

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
			name: "",
			phone: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				console.log("success");
				registerModal.onClose();
			})
			.catch(() => {
				console.log("error");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const onToggle = useCallback(() => {
		registerModal.onClose();
	}, [registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account" />

			<Input
				id="name"
				label="Name"
				required
				register={register}
				errors={errors}
			/>
			<Input
				id="email"
				label="Email"
				required
				register={register}
				errors={errors}
			/>
			<Input
				id="phone"
				label="Phone"
				type="phone"
				required
				register={register}
				errors={errors}
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				required
				register={register}
				errors={errors}
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button outline label="Continue with Google" icon={FcGoogle} />
			<Button outline label="Continue with Github" icon={AiFillGithub} />
			<div>
				<p className="text-neutral-500 text-center mt-4 font-light">
					Already have an account?{" "}
					<span
						onClick={onToggle}
						className="text-blue-400 cursor-pointer hover:underline"
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Login"
			onClose={registerModal.onClose}
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
