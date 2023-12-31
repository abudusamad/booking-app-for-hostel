import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface FormPopoverProps {
	children: React.ReactNode;
	sideOffset?: number;
	content: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

const FormPopover = ({
	children,
	sideOffset = 8,
	content,
	side = "bottom",
	align = "end",
}: FormPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent sideOffset={sideOffset} side={side} align={align}>
				{content}
			</PopoverContent>
		</Popover>
	);
};

export default FormPopover;
