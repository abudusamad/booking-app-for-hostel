import LoginModal from "../components/modal/login-modal";
import RegisterModal from "../components/modal/register-modal";

const ModalProvider = () => {
    return (  
        <>
            <RegisterModal />
            <LoginModal />
        </>
    );
}
 
export default ModalProvider;