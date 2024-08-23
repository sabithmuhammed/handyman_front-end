import React, { useEffect, useState } from "react";
import { BookingType } from "../../../types/stateTypes";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Flex,
    StackDivider,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
    cancelBooking,
    getUserBooking,
    scheduleBooking,
} from "../../../api/bookingApi";
import { Link } from "react-router-dom";
import { PiChatsBold } from "react-icons/pi";
import InvoiceButton from "../common/InvoiceButton";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiSolidCalendarEdit } from "react-icons/bi";
import ModalComponent from "../../common/ModalComponent";
import { toast } from "react-toastify";
import DatePickerCalendar from "../../common/DatePickerCalendar";
import RazorPayPayment from "../../common/RazorPayPayment";
import { BookingCard } from "./BookingCard";
import {
    InfiniteScrollCallback,
    useInfiniteScroll,
} from "../../../hooks/useInifiniteScroll";
import { Infinityloading } from "../../common/Infinityloading";

const Mybookings = () => {
    const {
        data: bookings,
        setData: setBookings,
        isLoading,
        containerRef,
    } = useInfiniteScroll<BookingType>(async (page: number) => {
        const res = await getUserBooking(page);
        const result: InfiniteScrollCallback<BookingType> = {
            data: [],
            hasMore: false,
        };
        if (res?.data) {
            console.log(page,res.data);
            
            result.data = res.data.data;
            result.hasMore = res.data.hasMore;
        }
        return result;
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: rIsOpen,
        onOpen: rOnOpen,
        onClose: rOnClose,
    } = useDisclosure();
    const [selectedBookingId, setSelectedBookingId] = useState("");
    const rejectJob = async () => {
        const res = await cancelBooking(selectedBookingId);
        if (res?.data) {
            toast.success("Booking canceled");
            setBookings((p) =>
                p.map((booking) => {
                    if (booking._id === selectedBookingId) {
                        booking.status = "canceled";
                    }
                    return booking;
                })
            );
            rOnClose();
        }
    };

    const handleCancelPress = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        rOnOpen();
    };

    // const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    // const changeParentState = () => {
    //     setReRender(!reRender);
    // };

    // const scheduleJob = async () => {
    //     const res = await scheduleBooking(selectedBookingId, selectedDates);
    //     if (res?.data) {
    //         toast.success("Rescheduled booking successfully");
    //         onClose();
    //         setReRender(!reRender);
    //     }
    // };

    const changePaymentStatus = (bookingId) => {
        setBookings((p) =>
            p.map((booking) => {
                if (booking._id === bookingId) {
                    booking.paymentDetails.status = "success";
                }
                return booking;
            })
        );
    };

    return (
        <div
            className="overflow-auto xl:col-span-2 px-5 relative"
            ref={containerRef}
        >
            <div className=" w-full p-1 bg-white  top-0 z-10 border-b-2 border-gray-400 sticky">
                <Text fontSize={"lg"} color={"gray"}>
                    My bookings
                </Text>
            </div>
            {bookings.length !== 0 ? (
                <>
                    {" "}
                    {bookings.map((item) => (
                        <BookingCard
                            key={item._id}
                            {...item}
                            handleCancelPress={handleCancelPress}
                            changePaymentStatus={changePaymentStatus}
                        />
                    ))}
                    {isLoading && (
                        <Infinityloading />
                    )}
                </>
            ) : (
                <Text textAlign={"center"} mt={10} fontSize={"lg"}>No Bookings</Text>
                
            )}
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
        </div>
    );
};

export default Mybookings;
