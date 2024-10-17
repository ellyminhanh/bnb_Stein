'use client'

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";


const AddPropertyModal = () =>{

    //state

    const [currentStep,setCurrentStep] = useState(1)
    const [dataCategory,setDatacategory] = useState('');
    const [dataTitle, setDatatittle] = useState('');
    const [dataDescription, setDatadescription] = useState('');
    const [dataPrice, setDataprice] = useState('');
    const [dataBedroom, setDatabedroom] = useState('');
    const [dataBathroom, setDatabathroom] = useState('');
    const [dataGuest, setDataguest] = useState('');
    const [dataCountry, setDatacountry] = useState<SelectCountryValue>();
    const [dataImage, setDataimage] = useState<File | null>(null);


    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();


    // parse in data

    const setCategory = (category : string) => {
        setDatacategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length>0) {
            const tmpImage = event.target.files[0];
            setDataimage(tmpImage);
        }
    }

    // submit all the data users put in

    const submitForm = async () => {
        console.log('submit form');

        if(dataTitle && dataDescription  && dataImage && dataCountry) {
            const formData = new FormData();
            formData.append('category',dataCategory);
            formData.append('title',dataTitle);
            formData.append('description',dataDescription);
            formData.append('price',dataPrice);
            formData.append('bedroom',dataBedroom);
            formData.append('bathroom',dataBathroom);
            formData.append('guests',dataGuest);
            formData.append('country',dataCountry.label);
            formData.append('country_code',dataCountry.value);
            formData.append('image',dataImage);

            const response = await apiService.post('/api/properties/create/',formData)

            if(response.success){
                console.log('posted sucessful!');
                router.push('/');
                addPropertyModal.close();
            }else{
                console.log('eroor')
            }
        
        }
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
            ) : currentStep == 4 ? (
                <>
                    <h2 className="mb-6 text-2xl">Location</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <SelectCountry 
                            value= {dataCountry}
                            onChange={(value) => setDatacountry(value as SelectCountryValue)}
                        />
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
            
            ) : currentStep == 5 ? (
                <>
                    <h2 className="mb-6 text-2xl">Image</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image
                                    fill
                                    alt='uploaded image'
                                    src={URL.createObjectURL(dataImage)}
                                    className="h-full object-cover rounded-xl"
                                />
                            </div>
                        )}

                    </div>


                    <CustomButton 
                        label="Previous"
                        onClick={() => setCurrentStep(4)}
                        className="mb-6 bg-black hover:bg-gray-800"
                    />

                    <CustomButton 
                        label="Submit"
                        onClick={submitForm}
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