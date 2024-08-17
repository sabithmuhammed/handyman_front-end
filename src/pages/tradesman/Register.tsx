import React, { useEffect, useState } from "react";
import MapComponent from "../../components/common/MapComponent";
import {
    tradesmanRegister,
    tradesmanStatusCheck,
} from "../../api/tradesmanApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LocationType } from "../../types/stateTypes";
import { useDispatch, useSelector } from "react-redux";
import { setTradesman, updateUserInfo } from "../../redux/slice/authSlice";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import Lottie from "lottie-react";
import beatLoader from "../../assets/animation/beatLoader.json";
import { MdMyLocation } from "react-icons/md";
import getCurrentLocation from "../../utils/getCurrentLocation";
import ModalComponent from "../../components/common/ModalComponent";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RootState } from "../../redux/store";

const Register = () => {
    const [name, setName] = useState("");
    const [profile, setProfile] = useState<File | null>(null);
    const [idImage, setIdImage] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState({} as LocationType);
    const [showRegister, setShowRegister] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [locationSelected, setLocationSelected] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        (async () => {
            const response = await tradesmanStatusCheck();
            if (response) {
                if (response.data.status == "Not verified") {
                    setShowRegister(false);
                }
                if (response.data.status == "Verified") {
                    console.log(userInfo, "userInfo");

                    dispatch(
                        updateUserInfo({
                            userData: { ...userInfo, isTradesman: true },
                        })
                    );
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
        if (!category.trim()) {
            toast.error("Skill can't be empty");
            error = true;
        }
        if (!experience) {
            toast.error("Experience can't be empty");
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
            category,
            experience,
            ...location,
        };
        const formData = Object.keys(formObject).reduce((formData, key) => {
            formData.append(key, formObject[key]);
            return formData;
        }, new FormData());
        formData.append("images", profile as File);
        formData.append("images", idImage as File);
        setBtnLoading(true);
        const response = await tradesmanRegister(formData);
        if (response?.data) {
            setShowRegister(false);
        }
        setBtnLoading(true);
    };
    console.log(import.meta.env.VITE_MAPBOX_TOKEN);

    return (
        <div className="w-full   py-7 bg-gray-200 flex justify-center items-center">
            {showRegister ? (
                <div className="w-[500px] h-dvh min-h-[400px] bg-white p-6 rounded-md shadow-lg flex flex-col">
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
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <label
                            htmlFor="skills"
                            className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                        >
                            Category (Eg:plumber, electrician)
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
                            <Button
                                border="2px"
                                borderColor="rgb(30, 27, 75)"
                                w={"full"}
                                leftIcon={
                                    !locationSelected ? (
                                        <MdMyLocation size={20} />
                                    ) : (
                                        <IoIosCheckmarkCircle size={20} />
                                    )
                                }
                                fontSize={"sm"}
                                onClick={() =>
                                    getCurrentLocation(setLocation, onOpen)
                                }
                            >
                                {!locationSelected
                                    ? "Select location"
                                    : "Location selected"}
                            </Button>
                            <ModalComponent
                                isOpen={isOpen}
                                onClose={onClose}
                                title={"Select location"}
                                action={{
                                    text: "Select",
                                    color: "blue",
                                    onClick: () => {
                                        setLocationSelected(true);
                                        onClose();
                                    },
                                }}
                            >
                                <div className="w-[400px]">
                                    <MapComponent
                                        {...location}
                                        setLocation={setLocation}
                                    />
                                </div>
                            </ModalComponent>
                        </div>
                    </div>
                    <Button
                        isLoading={btnLoading}
                        spinner={
                            <Lottie
                                animationData={beatLoader}
                                loop={true}
                                className=""
                            />
                        }
                        colorScheme="blue"
                        className="mt-5 w-[200px] py-2 rounded-full self-center"
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </div>
            ) : (
                <div className="h-dvh flex items-center">
                    <div className="w-[550px] min-h-[400px] bg-white p-6 rounded-md shadow-lg flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold mb-3">
                            We are verifying your account. Please be patient.
                        </h1>
                        <p className="mb-4">It will usually takes 24 hrs.</p>
                        <Link to="/" className="text-gray-500 underline">
                            Back to home
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
