'use client';

import AddPropertyModal from "../Modals/AddPropertyModal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropertyButtonProps {
    userID?: string | null ;

}

const PropertyButton: React.FC<AddPropertyButtonProps> = ({
    userID
}) => {
    const loginModal = useLoginModal();
    const addPropertyModal =useAddPropertyModal();  

    const airbnbYourHome = () =>{
        if (userID) {
            addPropertyModal.open()  
        } else {
            loginModal.open();
        }
        
    }

    return (
        <div 
            onClick={airbnbYourHome}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover: bg-gray-200"
        >
            Your home </div>    
    )
}

export default PropertyButton;