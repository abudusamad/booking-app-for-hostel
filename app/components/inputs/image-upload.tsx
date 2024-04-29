"use cleint";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloudinary: any;
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

interface ImageUploadProps {
	onChange: (count: number) => void;
	value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			uploadPreset={uploadPreset}
			onUpload={handleUpload}
			options={{ maxFiles: 1 }}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="relative hover:opacity-70 transition border-2 border-dashed p-20 border-neutral-400 flex flex-col items-center justify-center gap-4 text-neutral-600"
					>
						<TbPhotoPlus size={50} />
						<div className="font-sebold text-lg">Upload Image</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									fill
									src={value}
									style={{ objectFit: "cover" }}
									alt="House"
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
