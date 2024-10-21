'use client';

import { useState, useEffect } from "react";
import {Calendar, DateRange, Range} from 'react-date-range';
import {differenceInDays, eachDayOfInterval} from "date-fns";
import DatePicker from "../forms/Calendar";
import {format} from "date-fns/format";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property ={
    id: string;
    guests: number;
    price_per_night: number;

}

interface ReservationSidebarProps{
    userID: string | null,
    property: Property
}

const ReservationSidebar:React.FC<ReservationSidebarProps> = ({
    property,
    userID
}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [daterange, setDaterange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] =useState<string>('1');
    const [bookedDates,setBookedDates] =useState<Date[]>([]);

    const guestsRange = Array.from({length:property.guests},(_,index) => index + 1)

    const performBooking = async () => {
        if (userID){
            if (daterange.startDate && daterange.endDate){
                const formData = new FormData();
                formData.append('guests',guests);
                formData.append('start_date',format(daterange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date',format(daterange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights',nights.toString());
                formData.append('total_price',totalPrice.toString());


                const response = await apiService.post(`/api/properties/${property.id}/book/`,formData);

                if (response.success){
                    console.log('Booked successfully')
                }else{
                    console.log('Some thing went wrong ')
                }

            }
        }else{
            loginModal.open();
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() +1);

        }

        setDaterange({
            ...daterange,
            startDate: newStartDate,
            endDate : newEndDate
        })

    }

    const getReservation = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates: Date[] =[];

        reservations.forEach((reservations:any) =>{
            const range = eachDayOfInterval({
                start: new Date(reservations.start_date),
                end: new Date(reservations.end_date)
            });

            dates = [...dates,...range];
        })

        setBookedDates(dates);

    }

    useEffect(()=>{
        getReservation();
        if(daterange.startDate && daterange.endDate) {
            const dayCount = differenceInDays(
                daterange.endDate,
                daterange.startDate
            );

            if(dayCount && property.price_per_night){
                const _fee = ((dayCount * property.price_per_night)/100) % 5;
                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night)+ _fee);
                setNights(dayCount);

            }else{
                const _fee = (property.price_per_night/100) *5;
                setFee(_fee);
                setTotalPrice((property.price_per_night)+ _fee);
                setNights(1);
            }

        }
    },[daterange])

    return (
        <aside className="mt-4 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl ">
            <h2 className="mt-5 text-2xl">${property.price_per_night} per night</h2>
            
            <DatePicker
                value={daterange}
                bookedDates={bookedDates}
                onChange={(value)=> _setDateRange(value.selection)}
            />

            <div className="mb-6 p-3 border border-gray rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guest</label>

                <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full ml-1 text-xm"
                >
                    {guestsRange.map(number => (
                        <option key ={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>

            <div 
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white hover:bg-airbnb-dark bg-airbnb rounded-xl"
            >
                Book
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night *  nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>Airbnb fee</p>
                <p>${fee} </p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>${totalPrice} </p>
            </div>

        </aside>
    )
}

export default ReservationSidebar;