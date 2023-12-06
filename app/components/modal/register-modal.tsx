"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    return (<div>
        
    </div> );
}
 
export default RegisterModal;