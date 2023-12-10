"use client";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmpltyState = ({
    title = "No listings found",
    subtitle = "Try adjusting your search or filters to find what you're looking for.",
    showReset,
}:EmptyStateProps) => {
    return (<div className="h-[60vh] flex flex-col gap-2 justify-center items-center ">
        <Heading title={title} subtitle={subtitle} />
        
        <div className="w-48 mt-4">
            {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => {}}
                   
                >
                </Button>
            )}
        </div>
    </div> );
}
 
export default EmpltyState;