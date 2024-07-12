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
            rOnClose();
            setReRender(!reRender);
        }
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
    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes
            .toString()
            .padStart(2, "0")} ${period}`;
    };

    const checkDateIsBigger = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const curDate = new Date(date);
        curDate.setHours(0, 0, 0, 0);
        return curDate <= today;
    };

    return (
        <div className="w-full md:w-[550px]  ">
            {bookings.length !== 0
                ? bookings.map(
                      ({
                          _id,
                          tradesmanId,
                          address,
                          description,
                          bookingNumber,
                          bookingDate,
                          slots,
                          status,
                          amount,
                          paymentDetails,
                          service,
                      }) => (
                          <VStack
                              my={3}
                              bg={"white"}
                              alignItems={"flex-start"}
                              divider={<StackDivider />}
                              p={4}
                              borderRadius={5}
                              boxShadow={"md"}
                              key={_id}
                          >
                              <Flex justifyContent={"space-between"} w={"full"}>
                                  <Text fontSize={"lg"} className="font-bold">
                                      {typeof tradesmanId !== "string" &&
                                          tradesmanId.name}
                                  </Text>
                                  <Badge
                                      colorScheme="blue"
                                      variant={"outline"}
                                      py={1}
                                      px={3}
                                      rounded={"full"}
                                  >
                                      {status}
                                  </Badge>
                              </Flex>

                              <Flex
                                  direction={"column"}
                                  justifyContent={"flex-start"}
                                  w={"full"}
                              >
                                  <Flex direction={"column"} mb={5}>
                                      <Text fontSize={"xs"}>Service</Text>
                                      <Text>{service}</Text>
                                  </Flex>
                                  <Flex direction={"column"} mb={5}>
                                      <Text fontSize={"xs"}>Description</Text>
                                      <Text>{description}</Text>
                                  </Flex>
                                  <Flex mb={5}>
                                      <Box me={7}>
                                          <Text fontSize={"xs"}>
                                              Booking number
                                          </Text>
                                          <Text>{bookingNumber}</Text>
                                      </Box>
                                  </Flex>
                                  <Flex mb={5}>
                                      <Box me={7}>
                                          <Text fontSize={"xs"}>
                                              Booking date
                                          </Text>
                                          <Text>
                                              {new Date(
                                                  bookingDate
                                              ).toLocaleString("en-AU", {
                                                  day: "2-digit",
                                                  month: "2-digit",
                                                  year: "numeric",
                                              })}
                                          </Text>
                                      </Box>
                                  </Flex>
                                  <Flex mb={5}>
                                      <Box me={7}>
                                          <Text fontSize={"xs"}>Amount</Text>
                                          <Text>&#8377; {amount}</Text>
                                      </Box>
                                  </Flex>
                                  <Flex mb={5}>
                                      <Box me={7}>
                                          <Text fontSize={"xs"}>
                                              Scheduled Slots
                                          </Text>
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
                                                      .map((t) =>
                                                          convertTo12HourFormat(
                                                              t
                                                          )
                                                      )
                                                      .reduce(
                                                          (acc, curr) =>
                                                              acc + " - " + curr
                                                      )}
                                              </Badge>
                                          ))}
                                      </Box>
                                  </Flex>
                                  <Flex direction={"column"} w={"full"}>
                                      <Accordion allowMultiple>
                                          <AccordionItem>
                                              <h2>
                                                  <AccordionButton>
                                                      <Box
                                                          as="span"
                                                          flex="1"
                                                          textAlign="left"
                                                      >
                                                          <Text fontSize={"xs"}>
                                                              Address
                                                          </Text>
                                                      </Box>
                                                      <AccordionIcon />
                                                  </AccordionButton>
                                              </h2>
                                              <AccordionPanel pb={4}>
                                                  <Text>{address.house}</Text>
                                                  <Text>{address.street}</Text>
                                                  <Text>{address.city}</Text>
                                                  <Text>{address.state}</Text>
                                                  <Text>{address.country}</Text>
                                                  <Text>{address.pincode}</Text>
                                              </AccordionPanel>
                                          </AccordionItem>
                                      </Accordion>
                                  </Flex>
                              </Flex>
                              <Flex justifyContent={"flex-start"} w={"full"}>
                                  <Link
                                      to={`/chat?user=${
                                          typeof tradesmanId !== "string"
                                              ? tradesmanId._id
                                              : tradesmanId
                                      }&t=true`}
                                      className="mx-6 flex flex-col items-center"
                                  >
                                      <PiChatsBold size={26} className="me-2" />{" "}
                                      <Text fontWeight={"bold"} fontSize={"xs"}>
                                          Chat
                                      </Text>
                                  </Link>
                                  {status === "completed" ? (
                                      paymentDetails.status == "pending" ? (
                                          <div className="ms-auto  flex">
                                              <RazorPayPayment
                                                  amount={Number(amount)}
                                                  name={""}
                                                  bookingId={_id}
                                                  changeParentState={
                                                      changeParentState
                                                  }
                                              />
                                          </div>
                                      ) : (
                                          <button className="ms-auto mx-6 flex  items-center px-2 border-green-500 border-2 rounded ">
                                              <Text
                                                  fontWeight={"bold"}
                                                  fontSize={"sm"}
                                                  color={"green.500"}
                                              >
                                                  Paid &#8377; {amount}
                                              </Text>
                                          </button>
                                      )
                                  ) : (
                                      !checkDateIsBigger(bookingDate) && (
                                          <>
                                              {/* <button
                                                  className="flex flex-col items-center me-4"
                                                  onClick={() => {
                                                      setSelectedBookingId(_id);
                                                      setSelectedDates(
                                                          scheduledDate.map(
                                                              (date) =>
                                                                  new Date(date)
                                                          )
                                                      );
                                                      onOpen();
                                                  }}
                                              >
                                                  <BiSolidCalendarEdit
                                                      size={26}
                                                      className="me-2"
                                                  />
                                                  <Text
                                                      fontWeight={"bold"}
                                                      fontSize={"xs"}
                                                  >
                                                      Reschedule
                                                  </Text>
                                              </button> */}
                                              {status === "booked" && (
                                                  <button
                                                      className="flex flex-col items-center"
                                                      onClick={() => {
                                                          setSelectedBookingId(
                                                              _id
                                                          );
                                                          rOnOpen();
                                                      }}
                                                  >
                                                      <IoMdCloseCircleOutline
                                                          size={26}
                                                          className="me-2 text-red-400 "
                                                      />{" "}
                                                      <Text
                                                          fontWeight={"bold"}
                                                          fontSize={"xs"}
                                                          color={"red.400"}
                                                      >
                                                          Cancel
                                                      </Text>
                                                  </button>
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
                                                      Do you really want to
                                                      cancel this booking?
                                                  </Text>
                                              </ModalComponent>
                                              <ModalComponent
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
                                              </ModalComponent>
                                          </>
                                      )
                                  )}
                              </Flex>
                          </VStack>
                      )
                  )
                : "No bookings"}
        </div>
    );
};

export default Mybookings;
