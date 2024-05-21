import React, { useEffect, useState } from "react";
import MapComponent from "../../components/common/MapComponent";
import axios from "axios";

const AddTool = () => {
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [rent, setRent] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    useEffect(() => {
        (async () => {
            const res = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/kakkancherry.json`,
                {
                    params: {
                        access_token: import.meta.env.VITE_MAPBOX_TOKEN,
                    },
                }
            );
            console.log(res);
            
        })();
    });

    return (
        <div className="w-ful min-h-dvh flex justify-center items-center bg-slate-50 pt-24 pb-9">
            <form className="w-[500px]  rounded-md shadow-xl  p-7 flex flex-col items-center bg-white">
                <h1 className="text-2xl font-bold text-indigo-950">Add tool</h1>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
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
                    />
                    <div className=" mt-3 flex justify-between">
                        <div className="w-[100px] h-[100px] bg-red-500 rounded-md"></div>
                        <div className="w-[100px] h-[100px] bg-red-500 rounded-md"></div>
                        <div className="w-[100px] h-[100px] bg-red-500 rounded-md"></div>
                        <div className="w-[100px] h-[100px] bg-red-500 rounded-md"></div>
                    </div>
                </div>
                <div className="w-full my-5 relative">
                    <input
                        type="password"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="rent"
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
                        type="password"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="street"
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
                            type="password"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="city"
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
                            type="password"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="state"
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
                            type="password"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="country"
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
                            type="password"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="pin"
                        />
                        <label
                            htmlFor="pin"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Pincode
                        </label>
                    </div>
                </div>
                {/* <MapComponent latitude={7.544} longitude={10.87} /> */}

                <button className="bg-gradient-to-r from-indigo-950 to-indigo-700 text-white w-full h-10 rounded-full my-5 hover:from-indigo-700 hover:to-indigo-700 transition-colors delay-1000 ease-in">
                    Add tool
                </button>
            </form>
        </div>
    );
};

export default AddTool;
