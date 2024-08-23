import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Input, Select, useDisclosure } from "@chakra-ui/react";
import { getSkills } from "../../../api/userApi";
import axios from "axios";
import AddressSuggestion from "./AddressSuggestion";
import ModalComponent from "../../common/ModalComponent";
import MapComponent from "../../common/MapComponent";
import { LocationType } from "../../../types/stateTypes";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { MdOutlineMyLocation } from "react-icons/md";
import getCurrentLocation from "../../../utils/getCurrentLocation";
import { Link } from "react-router-dom";
import { addDays, addMonths } from "date-fns";

const mapboxClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
});

type PropType = {
    children?: React.JSX.Element;
};
const Filter = ({ children }: PropType) => {
    const [categories, setCategories] = useState<string[]>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState<string>();

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [place, setPlace] = useState("");
    useEffect(() => {
        (async () => {
            const res = await getSkills();
            if (res?.data) {
                setCategories(res.data);
            }
        })();
    }, []);

    const getAddressFromCoordinates = async () => {
        try {
            const response = await mapboxClient
                .reverseGeocode({
                    query: [location.longitude, location.latitude],
                    limit: 1,
                })
                .send();

            const addressString = response.body.features[0].place_name;
            setPlace(addressString);
            onClose();
            setShowSuggestion(false);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="w-full pb-5 bg-indigo-950 rounded-3xl">
            {children && children}
            <div
                className={`w-full ${
                    children ? "mt-5" : "pt-12 md:pt-20"
                } items-center flex justify-center  max-md:flex-col max-md:px-5`}
            >
                <div className="px-5 h-10 md:h-14 bg-white flex items-center rounded-md text-gray-900 mx-3 relative max-md:w-full max-md:my-1">
                    <div className="">
                        <IoLocationOutline size={20} />
                    </div>
                    <Input
                        type="text"
                        value={place}
                        size={{
                            base: "xs",
                            md: "sm",
                        }}
                        onChange={(e) => setPlace(e.target.value)}
                        onFocus={() => setShowSuggestion(true)}
                        mx={2}
                    />
                    <div className="cursor-pointer">
                        <MdOutlineMyLocation
                            size={20}
                            onClick={() =>
                                getCurrentLocation(setLocation, onOpen)
                            }
                        />
                    </div>
                    {showSuggestion && (
                        <AddressSuggestion
                            suggestionOnClick={({ placeName, coordinates }) => {
                                setPlace(placeName);
                                setLocation({
                                    longitude: coordinates[0],
                                    latitude: coordinates[1],
                                });
                                setShowSuggestion(false);
                            }}
                            text={place}
                        />
                    )}
                </div>
                <div className="px-5 h-10 md:h-14 bg-white flex items-center rounded-md text-gray-900 mx-3 max-md:w-full max-md:my-1">
                    <div className="">
                        <MdOutlineHandyman size={20} />
                    </div>
                    <Select
                        placeholder="Select category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        size={{
                            base: "xs",
                            md: "sm",
                        }}
                    >
                        {categories?.length !== 0 &&
                            categories?.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </Select>
                </div>
                <div className="px-5 h-10 md:h-14 bg-white flex items-center rounded-md text-gray-900 mx-3 max-md:w-full max-md:my-1">
                    <p className="me-3 text-sm md:text-base">Select date</p>
                    <div className="flex-grow">
                        <Input
                            size={{
                                base: "xs",
                                md: "sm",
                            }}
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            onBlur={(e) => {
                                const selectedDate = e.target.value;
                                const minDate = formatDate(
                                    addDays(new Date(), 1)
                                );
                                const maxDate = formatDate(
                                    addMonths(new Date(), 2)
                                );

                                if (selectedDate < minDate) {
                                    setDate(minDate);
                                } else if (selectedDate > maxDate) {
                                    setDate(maxDate);
                                }
                            }}
                            min={formatDate(addDays(new Date(), 1))}
                            max={formatDate(addMonths(new Date(), 2))}
                        />
                    </div>
                </div>
                <Link
                    to="/tradesmen"
                    state={{
                        longitude: location?.longitude,
                        latitude: location?.latitude,
                        category,
                        date,
                    }}
                    className="px-5 h-10 md:h-14 bg-yellow-300 flex items-center justify-center rounded-md text-black mx-3 max-md:w-full max-md:my-1"
                >
                    <p className="mx-3 text-sm md:text-base">Find tradesman</p>
                    <div className="">
                        <FaArrowRight />
                    </div>
                </Link>
            </div>
            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                title={"Select location"}
                action={{
                    text: "Select",
                    color: "blue",
                    onClick: getAddressFromCoordinates,
                }}
            >
                <div className="w-[400px]">
                    <MapComponent {...location} setLocation={setLocation} />
                </div>
            </ModalComponent>
        </div>
    );
};

export default Filter;
