import { Badge, Button, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import ModalComponent from "../../common/ModalComponent";
import MapComponent from "../../common/MapComponent";
import { LocationType } from "../../../types/stateTypes";
import { toast } from "react-toastify";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import AddressSuggestion from "../common/AddressSuggestion";
import { useParams } from "react-router-dom";
import { addNewBooking } from "../../../api/bookingApi";
import getCurrentLocation from "../../../utils/getCurrentLocation";
import DatePickerCalendar from "../../common/DatePickerCalendar";
import { IoCalendarOutline } from "react-icons/io5";

type FormType = {
    description: string;
    house: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    bookingDate: string;
};
const mapboxClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
});
const BookingForm = ({ service, selectedDate, selectedSlots }) => {
    const { tradesmanId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenD,
        onOpen: onOpenD,
        onClose: onCloseD,
    } = useDisclosure();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [formData, setFormData] = useState<FormType>({
        description: "",
        house: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        bookingDate: "",
    });

    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const [locationVerified, setLocationVirified] = useState(false);

    const [showSuggestion, setShowSuggestion] = useState(false);

    const getAddressFromCoordinates = async () => {
        try {
            const response = await mapboxClient
                .reverseGeocode({
                    query: [location.longitude, location.latitude],
                    limit: 1,
                })
                .send();

            const addressString = response.body.features[0].place_name;
            changeAddressFromString(addressString);

            setLocationVirified(true);
            onClose();
            setShowSuggestion(false);
        } catch (error) {
            console.log(error);
        }
    };
    const changeAddressFromString = (addressString: string) => {
        const address = addressString.split(", ");
        let street = address[0];
        let pincode = address[1];
        let city = address[2];
        let state = address[5];
        let country = address[6];
        if (address.length === 8) {
            street = address[0] + ", " + address[1];
            pincode = address[2];
            city = address[3];
            state = address[6];
            country = address[7];
        }

        setFormData((p) => ({
            ...formData,
            street,
            pincode,
            city,
            state,
            country,
        }));
    };

    const submitForm = async () => {
        const description = formData.description.trim();
        const house = formData.house.trim();
        const street = formData.street.trim();
        const city = formData.city.trim();
        const state = formData.state.trim();
        const country = formData.country.trim();
        const pincode = formData.pincode.trim();

        let hasError = false;
        if (!selectedDate) {
            toast.error("Select a date");
            hasError = true;
        }
        if (!service) {
            toast.error("Select a service");
            hasError = true;
        }
        if (selectedSlots.length !== Number(service.slots)) {
            toast.error("Select required slots");
            hasError = true;
        }
        console.log(selectedSlots);

        if (
            !description ||
            !street ||
            !house ||
            !city ||
            !state ||
            !country ||
            !pincode 
        ) {
            hasError = true;
            toast.error("Please fill all the fields");
        } else {
            if (pincode.length !== 6) {
                hasError = true;
                toast.error("Invalid pincode");
            }
        }
        if (hasError) {
            return;
        }

        const data = {
            tradesmanId,
            description,
            bookingDate: selectedDate,
            service: service.description,
            slots: selectedSlots,
            amount: Number(service.amount),
            address: {
                street,
                house,
                city,
                state,
                country,
                pincode,
                location: {
                    coordinates: [location.latitude, location.longitude],
                    type: "Point",
                },
            },
        };

        const res = await addNewBooking(data);
        if (res?.data) {
            toast.success("Sussessfully booked");
            setFormData({
                description: "",
                bookingDate: "",
                city: "",
                country: "",
                house: "",
                pincode: "",
                state: "",
                street: "",
            });
            setLocation({} as LocationType);
            setSelectedDates([]);
        }
    };

    return (
        <div className=" px-4 lg:border-l-2 border-gray-300 max-lg:border-t-2">
            <div className="w-full my-5 relative">
                <textarea
                    className=" border-gray-400  w-full border-b-2 focus:outline-none ps-2 peer"
                    placeholder=""
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
                <label
                    htmlFor="description"
                    className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                >
                    Description
                </label>
            </div>

            <div className="w-full my-5 relative">
                <input
                    type="text"
                    className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                    placeholder=""
                    id="house"
                    value={formData.house}
                    onChange={(e) =>
                        setFormData({ ...formData, house: e.target.value })
                    }
                />
                <label
                    htmlFor="house"
                    className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                >
                    House/Building name & number
                </label>
            </div>

            <div className="w-full my-5 grid grid-cols-2 gap-x-3 relative">
                <div className="col-span-1 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="country"
                        value={formData.street}
                        onChange={(e) =>
                            setFormData({ ...formData, street: e.target.value })
                        }
                        onFocus={() => setShowSuggestion(true)}
                    />
                    <label
                        htmlFor="country"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Street / Area
                    </label>
                </div>
                <div className="col-span-1 relative">
                    <Button
                        border="2px"
                        borderColor="rgb(30, 27, 75)"
                        w={"full"}
                        leftIcon={<MdMyLocation size={20} />}
                        fontSize={"sm"}
                        onClick={() => getCurrentLocation(setLocation, onOpen)}
                    >
                        Use my location
                    </Button>
                </div>
                {showSuggestion && (
                    <AddressSuggestion
                        text={formData.street}
                        suggestionOnClick={({ placeName, coordinates }) => {
                            changeAddressFromString(placeName);
                            setLocation({
                                longitude: coordinates[0],
                                latitude: coordinates[1],
                            });
                            setShowSuggestion(false);
                        }}
                    />
                )}
            </div>
            <div className="w-full my-5 grid grid-cols-2 gap-x-3">
                <div className="col-span-1 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                        }
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
                        value={formData.state}
                        onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                        }
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
                        value={formData.country}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                country: e.target.value,
                            })
                        }
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
                        value={formData.pincode}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                pincode: e.target.value,
                            })
                        }
                    />
                    <label
                        htmlFor="pin"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Pincode
                    </label>
                </div>
            </div>
            <div className="w-full my-5 grid grid-cols-1 gap-x-3">
                {/* <div className="col-span-1 flex justify-between items-center">
                    <div className="">
                        {selectedDates.length == 0 ? (
                            "Select dates"
                        ) : (
                            <div className="grid lg:grid-cols-2 gap-2 flex-grow">
                                {selectedDates.map((date, index) => (
                                    <div
                                        key={date.toDateString()}
                                        className="text-xs px-1 bg-gray-300 rounded-full"
                                    >
                                        {date.toLocaleString("en-AU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <IoCalendarOutline
                            size={24}
                            className="cursor-pointer"
                            onClick={onOpenD}
                        />
                    </div>
                </div> */}
                <div className="col-span-1 relative">
                    <Button
                        border="2px"
                        bg="rgb(30, 27, 75)"
                        color={"white"}
                        w={"full"}
                        rightIcon={<FaRegCalendarCheck size={16} />}
                        fontSize={"sm"}
                        _hover={{ opacity: ".9" }}
                        onClick={submitForm}
                    >
                        Book
                    </Button>
                </div>
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
            <ModalComponent
                title="Please select dates"
                isOpen={isOpenD}
                onClose={onCloseD}
                action={{
                    color: "blue",
                    onClick: onCloseD,
                    text: "Schedule",
                }}
            >
                <DatePickerCalendar
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                    tradesmanId={tradesmanId as string}
                />
            </ModalComponent>
        </div>
    );
};

export default BookingForm;
