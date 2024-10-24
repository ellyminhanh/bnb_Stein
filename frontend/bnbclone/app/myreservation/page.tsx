import Image from "next/image"
import apiService from "../services/apiService"

const MyReservationPage = async () => {
    const  reservations = await apiService.get('/api/auth/myreservation/')
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">     
                <h1 className="text-2xl mb-6 my-6 ">
                    My Reservation
                </h1>

               <div className="space-y-4">
                    {Array.isArray(reservations)&&reservations?.map((reservation: any) => {
                        return(
                            <div key={reservation.id} className="p-5 mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl" >
                                <div className="col-span-1 ">
                                    <div className="relative overflow-hidden aspect-square rounded-xl">
                                        <Image 
                                            fill 
                                            src = "/beach_1.jpg"
                                            alt = 'Reservation house'
                                            className="hover:scale-110 object-cover transition h-full w-full" />
                                    </div>
                                </div>

                                <div className="grid-cols-1 md:col-span-3 ">
                                    <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                                    <p className="mb-2"><strong>Checkin Date:</strong> {reservation.start_date}</p>
                                    <p className="mb-2"><strong>Checkout Date:</strong> 01/10/2024</p>

                                    <p className="mb-2"><strong>Number of nights:</strong> 2</p>
                                    <p className="mb-2"><strong>Total price:</strong> $200</p>

                                    <div className=" mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl">
                                        Go to Property
                                    </div>
                               </div>

                            </div>
                        )
                    })}
               </div>
        </main>
    )
}

export default MyReservationPage
