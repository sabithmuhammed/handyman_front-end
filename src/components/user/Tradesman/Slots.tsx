import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Box, Grid, GridItem, Select, Text, useToast } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import {
    format,
    addMinutes,
    isBefore,
    startOfDay,
    addDays,
    addMonths,
    isSameDay,
    parse,
} from "date-fns";
import { ConfigurationType } from "../../../types/stateTypes";
import { getUnavailable } from "../../../api/bookingApi";

const Slots = ({
    workingDays,
    bufferTime,
    services,
    slotSize,
    selectedDate,
    setSelectedDate,
    setService,
    selectedSlots,
    setSelectedSlots,
    tradesmanId,
    leaves,
}: ConfigurationType & {
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setService: React.Dispatch<
        React.SetStateAction<
            | {
                  description: string;
                  slots: string;
                  amount: string;
              }
            | undefined
        >
    >;
    selectedSlots: string[];
    setSelectedSlots: React.Dispatch<React.SetStateAction<string[]>>;
    tradesmanId: string;
    leaves: Array<{ date: Date }>;
}) => {
    const [disabledDays, setDisabledDays] = useState<number[]>([]);
    const [slotCount, setSlotCount] = useState(0);
    const toast = useToast();
    const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);

    useEffect(() => {
        // Identify the days when the tradesman is not working
        const daysOff = workingDays
            .map((day, index) => (day.isWorking ? null : index))
            .filter((index) => index !== null) as number[];
        setDisabledDays(daysOff);
    }, [workingDays]);

    const isDayDisabled = (date: Date) => {
        const dayOfWeek = date.getDay();
        if(disabledDays.includes(dayOfWeek)){
            return false
        }
        let isLeave = false;
        leaves.forEach((leave)=>{
            if(isSameDay(leave.date,date)){
                isLeave = true
            }
        }) 
        if(isLeave){
            return false
        }
        return true
        // return !disabledDays.includes(dayOfWeek) || leaves.some((leave) => !isSameDay(leave.date, date));
    };

    const getWorkingHours = () => {
        if (selectedDate) {
            const dayOfWeek = selectedDate.getDay();
            return workingDays[dayOfWeek];
        }
        return null;
    };

    useEffect(() => {
        (async () => {
            if (tradesmanId && selectedDate) {
                const res = await getUnavailable(
                    tradesmanId,
                    selectedDate?.toDateString()
                );
                if (res?.data) {
                    if (res.data[0]?.unavailableSlots) {
                        setUnavailableSlots(res.data[0].unavailableSlots);
                    }
                }
            }
        })();
    }, [selectedDate]);

    const generateTimeSlots = () => {
        const slots: string[] = [];
        const workingHours = getWorkingHours();
        if (!workingHours) return slots;

        let current = addMinutes(
            startOfDay(selectedDate!),
            parseTime(workingHours.start)
        );
        const end = addMinutes(startOfDay(selectedDate!), parseTime(workingHours.end));

        while (isBefore(current, end)) {
            const start = format(current, "HH:mm");
            const nextSlot = addMinutes(current, slotSize * 60);
            if (!isBefore(nextSlot, end)) break;
            const slotEnd = format(nextSlot, "HH:mm");
            const slot = `${start} - ${slotEnd}`;
            slots.push(slot);
            current = addMinutes(nextSlot, bufferTime);
        }

        return slots;
    };

    const parseTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const convertTo12HourFormat = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const handleTimeClick = (startTimeSlot: string) => {
        const startIndex = timeSlots.indexOf(startTimeSlot);
        if (startIndex === -1 || startIndex + slotCount > timeSlots.length) {
            toast({
                title: "Not Enough Slots",
                description:
                    "There are not enough consecutive slots available.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const selected: string[] = [];
        for (let i = 0; i < slotCount; i++) {
            const slot = timeSlots[startIndex + i];
            if (unavailableSlots.includes(slot)) {
                toast({
                    title: "Slot Unavailable",
                    description:
                        "One or more of the selected slots are unavailable. Please choose another slot.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            selected.push(slot);
        }
        setSelectedSlots(selected);
    };

    const timeSlots = generateTimeSlots();
    const minDate = addDays(new Date(), 1);
    const maxDate = addMonths(new Date(), 2);

    return (
        <Box className="flex flex-col items-center w-full gap-4  p-4">
            <Box w="full">
                <Text fontWeight="bold" mb="2">Select a Service:</Text>
                <Select
                    placeholder="Select option"
                    onChange={(e) => {
                        const selectedIndex = parseInt(e.target.value, 10);
                        setService(services[selectedIndex]);
                        setSlotCount(parseInt(services[selectedIndex].slots, 10));
                    }}
                >
                    {services &&
                        services.map((item, index) => (
                            <option key={index} value={index}>
                                {`${item.description} (${item.slots} slot(s) required) - ₹${item.amount}`}
                            </option>
                        ))}
                </Select>
            </Box>
            <Box w="full">
                <Text fontWeight="bold">Select a Date:</Text>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    filterDate={isDayDisabled}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a date"
                    className="mt-2 p-2 border rounded-md"
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </Box>

            {selectedDate && timeSlots.length > 0 && (
                <Box w={"full"}>
                    <Text fontWeight="bold">Select a Time:</Text>
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={4}
                        px={4}
                        w={"full"}
                        className="mt-2"
                    >
                        {timeSlots.map((time, index) => (
                            <GridItem
                                key={index}
                                onClick={() => handleTimeClick(time)}
                                cursor={
                                    unavailableSlots.includes(time)
                                        ? "not-allowed"
                                        : "pointer"
                                }
                                className={`p-2 text-center border rounded-md ${
                                    unavailableSlots.includes(time)
                                        ? "bg-red-500 text-white"
                                        : "bg-green-500 text-white"
                                } ${
                                    selectedSlots.includes(time)
                                        ? "border-2 border-blue-500"
                                        : ""
                                }`}
                            >
                                <Text fontSize={"xs"}>
                                    {convertTo12HourFormat(
                                        time.split(" - ")[0]
                                    )}{" "}
                                    -{" "}
                                    {convertTo12HourFormat(
                                        time.split(" - ")[1]
                                    )}
                                </Text>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default Slots;
