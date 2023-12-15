import LoginModal from "../components/modal/login-modal";
import RegisterModal from "../components/modal/register-modal";
import RentalModal from "../components/modal/rental-modal";
import SearchModal from "../components/modal/searchModal";

const ModalProvider = () => {
    return (  
        <>
            <RegisterModal />
            <LoginModal />
            <RentalModal />
            <SearchModal/>
    
        </>
    );
}
 
export default ModalProvider;