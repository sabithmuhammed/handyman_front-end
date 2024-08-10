import {
    Badge,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    StackDivider,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiChatsBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BookingType } from "../../types/stateTypes";
import ModalComponent from "../common/ModalComponent";
import DatePickerCalendar from "../common/DatePickerCalendar";
import {
    cancelBooking,
    jobCompleted,
    scheduleBooking,
} from "../../api/bookingApi";
import { toast } from "react-toastify";
import MapComponent from "../common/MapComponent";
import { RiMenuAddFill } from "react-icons/ri";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import Billing from "./Billing";
import { isSameDay } from "date-fns";

const ScheduleCard = ({
    _id,
    userId,
    description,
    address,
    tradesmanId,
    bookingDate,
    slots,
    bookingNumber,
    paymentDetails,
    service,
    changeParentState,
    completed = false,
}: BookingType & { changeParentState(): void; completed?: boolean }) => {
    const today = new Date();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isOpenC,
        onOpen: onOpenC,
        onClose: onCloseC,
    } = useDisclosure();
    const {
        isOpen: isOpenM,
        onOpen: onOpenM,
        onClose: onCloseM,
    } = useDisclosure();
    const {
        isOpen: rIsOpen,
        onOpen: rOnOpen,
        onClose: rOnClose,
    } = useDisclosure();

    const {
        isOpen: isOpenI,
        onOpen: onOpenI,
        onClose: onCloseI,
    } = useDisclosure();

    // const [selectedDates, setSelectedDates] = useState<Date[]>(
    //     scheduledDate.map((date) => new Date(date))
    // );
    today.setHours(0, 0, 0, 0);
    const checkToday = (dateString: string) => {
        const date = new Date(dateString);
        const isToday = isSameDay(date, new Date());

        if (isToday) {
            return (
                <Badge
                    variant="solid"
                    colorScheme="green"
                    borderRadius={"full"}
                >
                    Today
                </Badge>
            );
        }
        return <div className=""></div>;
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes
            .toString()
            .padStart(2, "0")} ${period}`;
    };

    const rejectJob = async () => {
        const res = await cancelBooking(_id);
        if (res?.data) {
            toast.success("Booking canceled");
            rOnClose();
            changeParentState();
        }
    };

    // const scheduleJob = async () => {
    //     const res = await scheduleBooking(_id, selectedDates);
    //     if (res?.data) {
    //         toast.success("Rescheduled booking successfully");
    //         changeParentState();
    //         onClose();
    //     }
    // };

    const changeStatus = async () => {
        const res = await jobCompleted(_id);
        if (res?.data) {
            toast.success("Job completed");
            changeParentState();
            onCloseC();
        }
    };

    return (
        <VStack
            divider={<StackDivider />}
            spacing={3}
            className=" bg-white p-3 rounded-md shadow-md"
            alignItems={"flex-start"}
        >
            <Flex justifyContent={"space-between"} w={"full"}>
                {checkToday(bookingDate)}
                <Badge
                    variant="subtle"
                    colorScheme={completed ? "green" : "blue"}
                    borderRadius={"full"}
                >
                    {completed ? "Completed" : "Pending"}
                </Badge>
            </Flex>
            <Text fontSize={"lg"} my={2} fontWeight={"bold"}>
                {typeof userId !== "string" && userId.name}
            </Text>
            <Flex direction={"column"}>
                <Text fontSize={"xs"}>Booking number</Text>
                <Text ms={2}>{bookingNumber}</Text>
            </Flex>
            <Flex direction={"column"}>
                <Text fontSize={"xs"}>Booking Date</Text>
                <Text ms={2}>
                    {new Date(bookingDate).toLocaleString("en-AU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </Text>
            </Flex>
            <Flex direction={"column"}>
                <Text fontSize={"xs"}>Service</Text>
                <Text ms={2}>{service}</Text>
            </Flex>
            <Flex direction={"column"}>
                <Text fontSize={"xs"}>Description</Text>
                <Text ms={2}>{description}</Text>
            </Flex>
            <Flex justifyContent={"space-around"} direction={"column"}>
                <Text fontSize={"xs"}>Scheduled slots</Text>
                <div className="">
                    {slots.map((time) => (
                        <Badge
                            colorScheme="green"
                            variant={"solid"}
                            mx={2}
                            px={3}
                            py={1}
                            rounded={"full"}
                            my={1}
                        >
                            {time
                                .split(" - ")
                                .map((t) => convertTo12HourFormat(t))
                                .reduce((acc, curr) => acc + " - " + curr)}
                        </Badge>
                    ))}
                </div>
            </Flex>
            <Flex direction={"column"}>
                <Text fontSize={"xs"}>Address</Text>
                <Text ms={2}>{address.house}</Text>
                <Text ms={2}>{address.street}</Text>
                <Text ms={2}>{address.city}</Text>
                <Text ms={2}>{address.state}</Text>
                <Text ms={2}>{address.country}</Text>
                <Text ms={2}>{address.pincode}</Text>
            </Flex>
            <Flex>
                {completed ? (
                    <button
                        className="px-2 bg-gray-700 text-white text-sm py-1 rounded-full cursor-pointer hover:opacity-90"
                        onClick={onOpenI}
                    >
                        Payment : {paymentDetails.status}
                    </button>
                ) : (
                    <button
                        className="px-2 bg-gray-700 text-white text-sm py-1 rounded-full cursor-pointer hover:opacity-90"
                        onClick={onOpenC}
                    >
                        Change status
                    </button>
                )}
            </Flex>
            <Flex justifyContent={"space-evenly"} w={"full"}>
                <button
                    className="flex flex-col items-center"
                    onClick={onOpenM}
                >
                    <FaMapLocationDot
                        size={26}
                        // className="me-2 text-red-400 "
                    />{" "}
                    <Text
                        fontWeight={"bold"}
                        fontSize={"xs"}
                        // color={"red.400"}
                    >
                        Map
                    </Text>
                </button>

                <Link
                    to={`../chats?user=${
                        typeof userId !== "string" ? userId._id : userId
                    }`}
                    className="mx-6 flex flex-col items-center"
                >
                    <PiChatsBold size={26} className="me-2" />{" "}
                    <Text fontWeight={"bold"} fontSize={"xs"}>
                        Chat
                    </Text>
                </Link>
                <button
                    className="flex flex-col items-center"
                    onClick={() => {
                        rOnOpen();
                    }}
                >
                    <IoMdCloseCircleOutline
                        size={26}
                        className="me-2 text-red-400 "
                    />{" "}
                    <Text fontWeight={"bold"} fontSize={"xs"} color={"red.400"}>
                        Cancel
                    </Text>
                </button>
                {/* {!completed && (
                    <button
                        className="flex flex-col items-center"
                        onClick={onOpen}
                    >
                        <BiSolidCalendarEdit size={26} className="me-2" />
                        <Text fontWeight={"bold"} fontSize={"xs"}>
                            Reschedule
                        </Text>
                    </button>
                )} */}
                {/* <ModalComponent
                    title="Please select dates"
                    isOpen={isOpen}
                    onClose={onClose}
                    action={{
                        color: "blue",
                        onClick: scheduleJob,
                        text: "Schedule",
                    }}
                >
                    <DatePickerCalendar
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                        tradesmanId={
                            typeof tradesmanId !== "string"
                                ? tradesmanId._id
                                : tradesmanId
                        }
                        reschedule={true}
                    />
                </ModalComponent> */}

                <ModalComponent
                    title="Please confirm your action"
                    isOpen={isOpenC}
                    onClose={onCloseC}
                    action={{
                        color: "blue",
                        onClick: changeStatus,
                        text: "Yes",
                    }}
                >
                    <Text>Are you sure to change the status?</Text>
                </ModalComponent>

                <ModalComponent
                    isOpen={isOpenM}
                    onClose={onCloseM}
                    title={"Location"}
                    // action={{
                    //     text: "Directions",
                    //     color: "blue",
                    //     onClick: () => {},
                    // }}
                >
                    <div className="w-full max-w-[400px]">
                        <MapComponent
                            longitude={address.location.coordinates[1]}
                            latitude={address.location.coordinates[0]}
                            setLocation={() => {}}
                        />
                    </div>
                </ModalComponent>

                <ModalComponent
                    title="Confirm your action"
                    isOpen={rIsOpen}
                    onClose={rOnClose}
                    action={{
                        color: "red",
                        onClick: rejectJob,
                        text: "Yes, cancel",
                    }}
                >
                    <Text fontSize={"lg"}>
                        Do you really want to cancel this booking?
                    </Text>
                </ModalComponent>
                {/* <Billing
                    isOpenI={isOpenI}
                    onCloseI={onCloseI}
                    onOpenI={onOpenI}
                    tradesmanId={tradesmanId as string}
                    bookingId={_id}
                    days={scheduledDate.length}
                    changeParentState={changeParentState}
                /> */}
            </Flex>
        </VStack>
    );
};

export default ScheduleCard;
