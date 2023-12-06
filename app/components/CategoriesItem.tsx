import { IconType } from "react-icons";

interface CategoriesItemProps {
    select?: boolean;
    label: string;
    icon: IconType;
    description?: string;
}


const CategoriesItem = ({
    select,
    label,
    icon: Icon,
    description,
}:CategoriesItemProps) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 text-center mt-4 opacity-75 hover:opacity-100 hover:underline
        ${select ? `border-b-neutral-800 : border-transparent` : `border-transparent`}
        ${select ? `text-neutral-800` : `text-neutral-500`}

        `}>
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
       
);
}
 
export default CategoriesItem;