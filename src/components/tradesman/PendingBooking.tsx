import {
    Box,
    Flex,
    StackDivider,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiChatsBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { BookingType } from "../../types/stateTypes";
import { Link } from "react-router-dom";
import ModalComponent from "../common/ModalComponent";
import DatePickerCalendar from "../common/DatePickerCalendar";
import { cancelBooking, scheduleBooking } from "../../api/bookingApi";
import { BiSolidCalendar } from "react-icons/bi";
import { toast } from "react-toastify";
import Booking from "../../pages/tradesman/Booking";

const PendingBooking = ({
    address,
    bookingDate,
    description,
    status,
    userId,
    _id,
    tradesmanId,
    removeBooking,
}: BookingType & { removeBooking: (bookingId: string) => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: rIsOpen,
        onOpen: rOnOpen,
        onClose: rOnClose,
    } = useDisclosure();
    const [selectedDates, setSelectedDates] = useState<Date[]>([
        new Date(bookingDate),
    ]);

    const scheduleJob = async () => {
        const res = await scheduleBooking(_id, selectedDates);
        if (res?.data) {
            toast.success("Scheduled booking successfully");
            removeBooking(_id);
            onClose();
        }
    };

    const rejectJob = async () => {
        const res = await cancelBooking(_id);
        if (res?.data) {
            toast.success("Booking canceled");
            removeBooking(_id);
            rOnClose();
        }
    };

    return (
        <VStack
            bg={"white"}
            alignItems={"flex-start"}
            divider={<StackDivider />}
            p={4}
            borderRadius={5}
            boxShadow={"md"}
        >
            <Text fontSize={"lg"} className="font-bold">
                {typeof userId !== "string" && userId.name}
            </Text>

            <Flex direction={"column"} justifyContent={"flex-start"}>
                <Flex direction={"column"} mb={5}>
                    <Text fontSize={"xs"}>Description</Text>
                    <Text>{description}</Text>
                </Flex>
                <Flex mb={5}>
                    <Box me={7}>
                        <Text fontSize={"xs"}>Date</Text>
                        <Text>
                            {new Date(bookingDate).toLocaleString("en-AU", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </Text>
                    </Box>
                </Flex>
                <Flex direction={"column"}>
                    <Text fontSize={"xs"}>Address</Text>
                    <Text>{address.house}</Text>
                    <Text>{address.street}</Text>
                    <Text>{address.city}</Text>
                    <Text>{address.state}</Text>
                    <Text>{address.country}</Text>
                    <Text>{address.pincode}</Text>
                </Flex>
            </Flex>
            <Flex justifyContent={"space-around"} w={"full"}>
                <button className="flex flex-col items-center" onClick={onOpen}>
                    <BiSolidCalendar size={26} className="me-2" />
                    <Text fontWeight={"bold"} fontSize={"xs"}>
                        Schedule
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
                    onClick={rOnOpen}
                >
                    <IoMdCloseCircleOutline
                        size={26}
                        className="me-2 text-red-400 "
                    />{" "}
                    <Text fontWeight={"bold"} fontSize={"xs"} color={"red.400"}>
                        Reject
                    </Text>
                </button>
                <ModalComponent
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
                        tradesmanId={tradesmanId}
                    />
                </ModalComponent>
                <ModalComponent
                    title="Confirm your action"
                    isOpen={rIsOpen}
                    onClose={rOnClose}
                    action={{
                        color: "red",
                        onClick: rejectJob,
                        text: "Reject",
                    }}
                >
                    <Text fontSize={"lg"}>
                        Do you really want to reject this booking?
                    </Text>
                </ModalComponent>
            </Flex>
        </VStack>
    );
};

export default PendingBooking;
