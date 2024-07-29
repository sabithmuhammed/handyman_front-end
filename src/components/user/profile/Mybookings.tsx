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

const Mybookings = () => {
    const [bookings, setBookings] = useState<BookingType[]>([]);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {
        (async () => {
            const res = await getUserBooking();
            if (res?.data) {
                setBookings(res.data);
            }
        })();
    }, [reRender]);

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

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const changeParentState = () => {
        setReRender(!reRender);
    };

    const scheduleJob = async () => {
        const res = await scheduleBooking(selectedBookingId, selectedDates);
        if (res?.data) {
            toast.success("Rescheduled booking successfully");
            onClose();
            setReRender(!reRender);
        }
    };

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
        <div className="overflow-auto xl:col-span-2 px-5 relative">
            <div className=" w-full p-1 bg-white  top-0 z-10 border-b-2 border-gray-400 sticky">
                <Text fontSize={"lg"} color={"gray"}>
                    My bookings
                </Text>
            </div>
            {bookings.length !== 0
                ? bookings.map((item) => (
                      <BookingCard
                          key={item._id}
                          {...item}
                          handleCancelPress={handleCancelPress}
                          changePaymentStatus={changePaymentStatus}
                      />
                  ))
                : "No bookings"}
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
            {/* <ModalComponent
                                                  title="Please select dates"
                                                  isOpen={isOpen}
                                                  onClose={onClose}
                                                  action={{
                                                      color: "blue",
                                                      onClick: scheduleJob,
                                                      text: "Schedule",
                                                      disabled:
                                                          selectedDates.length ==
                                                          0,
                                                  }}
                                              >
                                                  <DatePickerCalendar
                                                      selectedDates={
                                                          selectedDates
                                                      }
                                                      setSelectedDates={
                                                          setSelectedDates
                                                      }
                                                      tradesmanId={
                                                          typeof tradesmanId !==
                                                          "string"
                                                              ? tradesmanId._id
                                                              : tradesmanId
                                                      }
                                                      reschedule={true}
                                                  />
                                              </ModalComponent> */}
        </div>
    );
};

export default Mybookings;
