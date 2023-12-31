import { IconType } from "react-icons";

interface MenuItemProps {
	onClick: () => void;
	label: string;
    icon?: IconType;

}

const MenuItem = ({ onClick, label, icon: Icon}: MenuItemProps) => {
	return (
		<div
			onClick={onClick}
            className="px-4 py-2 hover:bg-neutral-100 transition cursor-pointer font-semibold flex 
            gap-6  text-xl text-neutral-600"
		>
			{label}
			{Icon && <Icon className="ml-2" />}
		</div>
	);
};

export default MenuItem;
