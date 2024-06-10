import React, { useEffect, useState } from "react";
import MapComponent from "../../components/common/MapComponent";
import {
    tradesmanRegister,
    tradesmanStatusCheck,
} from "../../api/tradesmanApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LocationType } from "../../types/stateTypes";
import { useDispatch } from "react-redux";
import { setTradesman } from "../../redux/slice/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [profile, setProfile] = useState<File | null>(null);
    const [idImage, setIdImage] = useState<File | null>(null);
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [wageAmount, setWageAmount] = useState("");
    const [wageType, setWageType] = useState("Day");
    const [location, setLocation] = useState({} as LocationType);
    const [showRegister, setShowRegister] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLocation({
                ...location,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            });
        });
    }, []);

    useEffect(() => {
        (async () => {
            const response = await tradesmanStatusCheck();
            if (response) {
                if (response.data.status == "Not verified") {
                    setShowRegister(false);
                }
                if (response.data.status == "Verified") {
                    dispatch(setTradesman({ ...response.data.data }));
                    navigate("../dashboard");
                }
            }
        })();
    }, []);

    const handleSubmit = async () => {
        let error = false;
        if (!name.trim()) {
            toast.error("Name can't be empty");
            error = true;
        } else if (!/^[a-z ,.'-]+$/i.test(name)) {
            toast.error("Invalid name");
            error = true;
        }
        if (!skills.trim()) {
            toast.error("Skill can't be empty");
            error = true;
        }
        if (!experience) {
            toast.error("Experience can't be empty");
            error = true;
        }
        if (!wageAmount) {
            toast.error("Wage amount can't be empty");
            error = true;
        }
        if (!profile) {
            toast.error("Please select a profile image");
            error = true;
        }
        if (!idImage) {
            toast.error("Please select id image");
            error = true;
        }
        if (error) {
            return;
        }
        const formObject = {
            name,
            skills,
            experience,
            wageAmount,
            wageType,
            ...location,
        };
        const formData = Object.keys(formObject).reduce((formData, key) => {
            formData.append(key, formObject[key]);
            return formData;
        }, new FormData());
        formData.append("images", profile as File);
        formData.append("images", idImage as File);
        const response = await tradesmanRegister(formData);
        if (response?.data) {
            setShowRegister(false);
        }
    };

    return (
        <div className="w-full  py-7 bg-gray-200 flex justify-center items-center overflow-auto">
            {showRegister ? (
                <div className="w-[500px] min-h-[400px] bg-white p-6 rounded-md shadow-lg flex flex-col">
                    <div className="flex  items-center">
                        <div className="w-[100px] h-[100px] bg-slate-400 flex-shrink-0 me-4 rounded-md overflow-hidden">
                            {profile && (
                                <img
                                    src={URL.createObjectURL(profile)}
                                    alt=""
                                    className="object-cover w-full h-full"
                                />
                            )}
                        </div>
                        <div className="flex-grow my-5 relative">
                            <p className="text-gray-500 px-2 mb-2">
                                Upload a photo
                            </p>
                            <input
                                type="file"
                                name=""
                                id=""
                                className="w-full h-9 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                onChange={(e) => {
                                    if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                    )
                                        setProfile(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex-grow my-5 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <label
                            htmlFor="name"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Full name (As per Id)
                        </label>
                    </div>
                    <div className="flex-grow my-5 relative">
                        <input
                            type="text"
                            className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                            placeholder=""
                            id="skills"
                            onChange={(e) => setSkills(e.target.value)}
                            value={skills}
                        />
                        <label
                            htmlFor="skills"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Skills (Eg:plumber, electrician)
                        </label>
                    </div>
                    <div className="flex my-5">
                        <div className="flex-grow  relative me-5">
                            <input
                                type="number"
                                className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                                placeholder=""
                                id="experience"
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                            <label
                                htmlFor="experience"
                                className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                            >
                                Experience
                            </label>
                        </div>
                        <div className=" relative">
                            <input
                                type="text"
                                className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                                placeholder=""
                                id="wage"
                                value={wageAmount}
                                onChange={(e) => setWageAmount(e.target.value)}
                            />
                            <label
                                htmlFor="wage"
                                className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                            >
                                Wage
                            </label>
                        </div>
                        <div className="flex-grow relative">
                            <select
                                className=" border-gray-400 h-9 w-[100px] border-b-2 focus:outline-none indent-2 peer"
                                id="wage"
                                onChange={(e) => setWageType(e.target.value)}
                                value={wageType}
                            >
                                <option value="Day">Day</option>
                                <option value="Hour">Hour</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-grow my-5">
                        <p className="text-gray-500 px-2 mb-2">Upload ID</p>
                        <input
                            type="file"
                            name=""
                            id=""
                            className="w-full h-9 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0)
                                    setIdImage(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="">
                        <p className="text-gray-500 px-2 mb-2">
                            Select location
                        </p>
                        <div className="">
                            {location.latitude && location.longitude && (
                                <MapComponent
                                    {...location}
                                    setLocation={setLocation}
                                />
                            )}
                        </div>
                    </div>
                    <button
                        className="mt-5 bg-gray-600 text-white hover:bg-gray-700 w-[200px] py-2 rounded-full self-center"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>
            ) : (
                <div className="w-[550px] min-h-[400px] bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold mb-3">
                        We are verifying your account. Please be patient.
                    </h1>
                    <p className="mb-4">It will usually takes 24 hrs.</p>
                    <Link to="/" className="text-gray-500 underline">
                        Back to home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Register;
