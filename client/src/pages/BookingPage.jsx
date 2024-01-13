import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import AdderessLink from "../AdderessLink";
import PlaceGallary from "../PlaceGallary";
import BookingDates from "../BookingDates";

export default function BookingPage() {

    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);

    if (!booking) {
        return 'm';
    }


    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AdderessLink className='my-2 block'>{booking.place.adderess}</AdderessLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information: </h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total Price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>

            <PlaceGallary place={booking.place}></PlaceGallary>
        </div>
    )
}