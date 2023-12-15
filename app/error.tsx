"use client";

import { useEffect } from "react";
import EmpltyState from "./components/EmptyState";

interface ErrorStateProps {
    error: Error;
}
const ErrorState = ({ error }: ErrorStateProps) => {
    useEffect(() => {
        console.log(error);
    }, [error]);
    return ( 
        <EmpltyState
            title=" Uh Oh"
            subtitle="Something went wrong"
        />
     );
}
 
export default ErrorState;