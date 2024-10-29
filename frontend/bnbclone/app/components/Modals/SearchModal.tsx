'use client';

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSerachModal";


const SearchModal =() => {
    let content = (<></>);
    const SearchModal = useSearchModal();
    return(
        <Modal
            isOpen={SearchModal.isOpen}
            close={SearchModal.close}
            label = 'Search'
            content={content}
        />

    )
}

export default SearchModal;