'use client';

import Image from "next/image"
import apiService from "../services/apiService"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

const MyReservationPage = () => {
    const router = useRouter();
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                //console.log('Fetching reservations...'); // Debug log
                const data = await apiService.get('/api/auth/myreservation/');
                //console.log('Received data:', data); // Debug log
                setReservations(data);
            } catch (error) {
                //console.error('Error fetching reservations:', error);
                setError('Failed to load reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="text-2xl mb-6 my-6">My Reservations</h1>
                <p>Loading...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="text-2xl mb-6 my-6">My Reservations</h1>
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">     
            <h1 className="text-2xl mb-6 my-6">
                My Reservations
            </h1>
            <div className="space-y-4">
                {reservations && reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <div key={reservation.id} className="p-5 mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <img 
                                        src="/beach_1.jpg"
                                        alt={reservation.property?.title || "Property"}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="grid-cols-1 md:col-span-3">
                                <h2 className="mb-4 text-xl">
                                    {reservation.property?.title || "Property Title"}
                                </h2>
                                <p className="mb-2">
                                    <strong>Checkin Date:</strong> {reservation.start_date || "N/A"}
                                </p>
                                <p className="mb-2">
                                    <strong>Checkout Date:</strong> {reservation.end_date || "N/A"}
                                </p>
                                <p className="mb-2">
                                    <strong>Number of nights:</strong> {reservation.number_of_nights || 0}
                                </p>
                                <p className="mb-2">
                                    <strong>Total price:</strong> ${reservation.total_price || 0}
                                </p>
                                <div
                                    onClick={() => router.push(`/properties/${reservation.property?.id}`)}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
                                    role="button"  // Added for accessibility
                                >
                                    Go to Property
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
        </main>
    );
};

export default MyReservationPage;