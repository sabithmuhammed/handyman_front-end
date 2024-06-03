import React, { useEffect, useState } from "react";
import MapComponent from "../../components/common/MapComponent";
import axios from "axios";
import { LocationType } from "../../types/stateTypes";
import { toast } from "react-toastify";
import { addTool } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const AddTool = () => {
    const [name, setName] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [rent, setRent] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [location, setLocation] = useState({} as LocationType);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({
                ...location,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            });
        });
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            let images: File[] = [];
            for (
                let i = 0;
                i < (e.target.files.length < 4 ? e.target.files.length : 4);
                i++
            ) {
                images.push(e.target.files[i]);
            }
            setImages(images);
        }
    };

    const handleSubmit = async () => {
        let error = false;

        if (
            !name.trim() ||
            !rent ||
            !street.trim() ||
            !city.trim() ||
            !state.trim() ||
            !country.trim() ||
            !pincode
        ) {
            toast.error("Please fill all the fields");
            error = true;
        }
        if (images.length < 4) {
            toast.error("Please select 4 images");
            error = true;
        }
        if (pincode.length !== 6) {
            toast.error("The pincode must be exactly 6 digits long");
        }

        if (error) {
            return;
        }
        const formObject = {
            name: name.trim(),
            ...location,
            rent: rent.trim(),
            street: street.trim(),
            city: city.trim(),
            state: state.trim(),
            country: country.trim(),
            pincode: pincode.trim(),
        };
        const formData = Object.keys(formObject).reduce((formData, key) => {
            formData.append(key, formObject[key]);
            return formData;
        }, new FormData());
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        const res = await addTool(formData);
        if (res) {
            toast.success("Tool successfully added ")
            navigate("/manage-tools");
        }
    };

    return (
        <div className="w-ful min-h-dvh flex justify-center items-center bg-slate-50 pt-24 pb-9">
            <div
                className="w-[500px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white"
            >
                <h1 className="text-2xl font-bold text-indigo-950">Add tool</h1>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Tool Name
                    </label>
                </div>
                <div className=" w-full my-5 relative">
                    <label htmlFor="images" className="inline-block mb-3 ms-2">
                        Select 4 images
                    </label>
                    <input
                        type="file"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="images"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className=" mt-3 flex justify-between">
                        {images.length > 0 &&
                            images.map((image) => (
                                <div className="w-[100px] h-[100px] rounded-md">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="w-full my-5 relative">
                    <input
                        type="number"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="rent"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                    />
                    <label
                        htmlFor="rent"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Rent / Day
                    </label>
                </div>
                <div className="w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <label
                        htmlFor="street"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Street
                    </label>
                </div>
                <div className="w-full my-5 grid grid-cols-2 gap-x-3">
                    <div className="col-span-1 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <label
                            htmlFor="city"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            City
                        </label>
                    </div>
                    <div className="col-span-1 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <label
                            htmlFor="state"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            State
                        </label>
                    </div>
                </div>
                <div className="w-full my-5 grid grid-cols-2 gap-x-3">
                    <div className="col-span-1 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <label
                            htmlFor="country"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Country
                        </label>
                    </div>
                    <div className="col-span-1 relative">
                        <input
                            type="number"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="pin"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                        <label
                            htmlFor="pin"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Pincode
                        </label>
                    </div>
                </div>
                {location.latitude && location.longitude && (
                    <MapComponent {...location} setLocation={setLocation} />
                )}

                <button className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-colors delay-1000 ease-in"
                onClick={handleSubmit}>
                    Add tool
                </button>
            </div>
        </div>
    );
};

export default AddTool;
