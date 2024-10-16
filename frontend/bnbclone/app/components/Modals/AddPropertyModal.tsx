'use client'

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";

const AddPropertyModal = () =>{
    const [currentStep,setCurrentStep] = useState(1)
    const [dataCategory,setDatacategory] = useState('');
    const [dataTitle, setDatatittle] = useState('');
    const [dataDescription, setDatadescription] = useState('');
    const [dataPrice, setDataprice] = useState('');
    const [dataBedroom, setDatabedroom] = useState('');
    const [dataBathroom, setDatabathroom] = useState('');
    const [dataGuest, setDataguest] = useState('');


    const addPropertyModal = useAddPropertyModal();

    const setCategory = (category : string) => {
        setDatacategory(category)
    }

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Choose category</h2>
                    <Categories
                        dataCategory ={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />

                    
                    <CustomButton 
                        label="Next"
                        onClick={() => setCurrentStep(2)}
                        className="mt-6"
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className="mb-6 text-2xl">Describe your place</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Title</label>
                            <input 
                                type="text" 
                                value = {dataTitle}
                                onChange={(e) => setDatatittle(e.target.value)} 
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <textarea 
                                value = {dataDescription}
                                onChange={(e) => setDatadescription(e.target.value)} 
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            ></textarea>
                        </div>
                    </div>

                    <CustomButton 
                        label="Previous"
                        onClick={() => setCurrentStep(1)}
                        className="mb-6 bg-black hover:bg-gray-800"
                    />

                    <CustomButton 
                        label="Next"
                        onClick={() => setCurrentStep(3)}
                        className="mt-6"
                    />

                </>
            ) :  currentStep == 3 ? (
                <>
                    <h2 className="mb-6 text-2xl">Details</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Price per night </label>
                            <input 
                                type="number" 
                                value = {dataPrice}
                                onChange={(e) => setDataprice(e.target.value)} 
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Bedrooms </label>
                            <input 
                                type="number" 
                                value = {dataBedroom}
                                onChange={(e) => setDatabedroom(e.target.value)} 
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Bathrooms</label>
                            <input 
                                type="number" 
                                value = {dataBathroom}
                                onChange={(e) => setDatabathroom(e.target.value)} 
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label>Maximize number of guests </label>
                            <input 
                                type="number" 
                                value = {dataGuest}
                                onChange={(e) => setDataguest(e.target.value)} 
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <CustomButton 
                        label="Previous"
                        onClick={() => setCurrentStep(2)}
                        className="mb-6 bg-black hover:bg-gray-800"
                    />

                    <CustomButton 
                        label="Next"
                        onClick={() => setCurrentStep(4)}
                        className="mt-6"
                    />
                </>
            ) : currentStep ==4 ? (
                <>
                    <h2 className="mb-6 text-2xl">Location</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        testst div 153
                    </div>

                    <CustomButton 
                        label="Previous"
                        onClick={() => setCurrentStep(3)}
                        className="mb-6 bg-black hover:bg-gray-800"
                    />

                    <CustomButton 
                        label="Next"
                        onClick={() => setCurrentStep(5)}
                        className="mt-6"
                    />
                </>
            ) : (
                <p>test</p>
            ) }
            
        </>
    )

    return(
        <>
            <Modal
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label= 'Add Property'
                content={content}
            ></Modal>
        </>
    )
}

export default AddPropertyModal;