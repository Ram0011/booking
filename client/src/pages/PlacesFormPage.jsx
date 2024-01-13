import PhotosUploder from "../PhotosUploder"
import Perks from "../Perks"
import { useEffect, useState } from "react";
import axios from 'axios';
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [adderess, setAdderess] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAdderess(data.adderess);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkOut);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = { title, adderess, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price };
        if (id) {
            //update
            await axios.put('/places', { id, ...placeData });
            setRedirect(true);
        } else {
            //new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }

    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {inputHeader('title')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment" />
                {inputHeader('Adderess')}
                <input type="text" value={adderess} onChange={ev => setAdderess(ev.target.value)} placeholder="adderess" />
                {inputHeader('Photos (at least 3)')}
                <PhotosUploder addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {inputHeader('Description')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {inputHeader('Perks')}
                <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {inputHeader('Extra Info')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="house rules etc..." />
                {inputHeader('Checkin & Checkout time')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4 ">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="text"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}