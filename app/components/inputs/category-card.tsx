import { IconType } from "react-icons";

interface CategoryCardProps {
	icon: IconType;
	label: string;
	selected?: boolean;
	description?: string;
	onClick: (value: string) => void;
}

const CategoryCard = ({
	icon: Icon,
	label,
	selected,
	description,
	onClick,
}: CategoryCardProps) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`rounded-xl border-2 p-4 flex flex-col items-center justify-center cursor-pointer gap-3 hover:border-black transition 
            ${selected ? "border-black" : "border-transparent"}`}
		>
			<Icon size={32} />
			<div className="font-semibold">{label}</div>
			<div className="text-center text-sm text-gray-600">{description}</div>
		</div>
	);
};

export default CategoryCard;
