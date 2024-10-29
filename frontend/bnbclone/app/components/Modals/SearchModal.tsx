'use client';

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry";
import { Calendar } from "react-date-range";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar"
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import { Container } from "postcss";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal =() => {
    let content = (<></>);
    const SearchModal = useSearchModal();
    const [numGuests, setNumGuests] = useState<string>('1');
    const [numBedrooms, setNumBedrooms] = useState<string>('1');
    const [numBathrooms, setNumBathrooms] = useState<string>('1');
    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDaterange] = useState<Range>(initialDateRange);

    const closeAndSearch = () => {
        SearchModal.close();
    }

    //set date range 

    const _setDaterange = (Selection:Range) => {
        if (SearchModal.step === 'checkin'){
            SearchModal.open('checkout');
        }else if (SearchModal.step === 'checkout'){
            SearchModal.open('details');
        }

        setDaterange(Selection);
    }
    //


    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Checkin Date"
                    onClick={() => SearchModal.open('checkin')}
                />
 
            </div>

        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in ?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDaterange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Location"
                    onClick={() => SearchModal.open('location')}
                />
                <CustomButton
                    label="Checkout Date"
                    onClick={() => SearchModal.open('checkout')}
                />
            </div>
        
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check out ?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDaterange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Checkin Date"
                    onClick={() => SearchModal.open('checkin')}
                />
                <CustomButton
                    label="Details"
                    onClick={() => SearchModal.open('details')}
                />
            </div>
        
        </>
    )   

    const contentDetails  = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numGuests} 
                        placeholder="Num of guests"
                        onChange={(e)=>setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-grey-300 rounded-xl">
                    </input>
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numBedrooms} 
                        placeholder="Num of bedrooms"
                        onChange={(e)=>setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-grey-300 rounded-xl">
                    </input>
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numBathrooms} 
                        placeholder="Num of bathrooms"
                        onChange={(e)=>setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-grey-300 rounded-xl">
                    </input>
                </div>


            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Checkout Date"
                    onClick={() => SearchModal.open('checkout')}
                />
                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        
        </>
    )

    if(SearchModal.step == 'location') {
        content = contentLocation;
    }else if (SearchModal.step == 'checkin'){
        content = contentCheckin;
    }else if (SearchModal.step == 'checkout'){
        content = contentCheckout;
    }else if (SearchModal.step === 'details'){
        content = contentDetails;
    }

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