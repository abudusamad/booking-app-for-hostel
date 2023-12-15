import LoginModal from "../components/modal/login-modal";
import RegisterModal from "../components/modal/register-modal";
import RentalModal from "../components/modal/rental-modal";

const ModalProvider = () => {
    return (  
        <>
            <RegisterModal />
            <LoginModal />
            <RentalModal />
        </>
    );
}
 
export default ModalProvider;