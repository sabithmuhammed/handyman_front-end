import {
    Box,
    Button,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PopoverComponent } from "../common/PopoverComponent";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LeaveType } from "../../types/stateTypes";
import DatePicker from "react-datepicker";
import ModalComponent from "../common/ModalComponent";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { addDays, addMonths } from "date-fns";
import { toast } from "react-toastify";
import { bookingDatesCheck } from "../../api/bookingApi";
import { addLeave, removeLeave } from "../../api/tradesmanApi";

type PropsType = {
    leavesProp: LeaveType[];
};

export const LeavesTile = ({ leavesProp }: PropsType) => {
    const [leaves, setLeaves] = useState(leavesProp);
    const [disabledDays, setDisabledDays] = useState(
        leaves.map(({ date }) => new Date(date))
    );

    useEffect(() => {
        setDisabledDays(leaves.map(({ date }) => new Date(date)));
    }, [leaves]);

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [reason, setReason] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDateChange = (date: Date) => {
        // Toggle the date selection
        if (selectedDates.some((d) => d.getTime() === date.getTime())) {
            setSelectedDates(
                selectedDates.filter((d) => d.getTime() !== date.getTime())
            );
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    const isDayDisabled = (date: Date) => {
        const day = date.getDay();
        return !disabledDays.some((d) => d.getTime() === date.getTime());
    };
    const minDate = addDays(new Date(), 1);
    const maxDate = addMonths(new Date(), 2);

    const handleNewLeaves = async () => {
        if (selectedDates.length === 0) {
            toast.error("Select at least 1 date");

            return;
        }
        if (!reason.trim()) {
            toast.error("Please provide a reason");
            return;
        }

        const dateCheck = await bookingDatesCheck(selectedDates);
        if (dateCheck?.data) {
            const res = await addLeave(selectedDates, reason);
            if (res?.data) {
                setLeaves(res.data.configuration.leaves);
                setSelectedDates([]);
                setReason("");
                onClose();
            }
        }
    };

    const handleDelete = async (date: string | Date) => {
        const res = await removeLeave(date);
        if (res?.data) {
            setLeaves(res.data.configuration.leaves);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-3 min-h-28">
            <div className="flex justify-between mb-3">
                <Text as={"b"}>Upcoming leaves</Text>
                <Button size={"sm"} variant={"outline"} onClick={onOpen}>
                    Add leave
                </Button>
            </div>
            {leaves
    .filter((leave) => new Date(leave.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .length !== 0 ? (
        <TableContainer>
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Reason</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leaves
                        .filter((leave) => new Date(leave.date) >= new Date())
                        .sort(
                            (a, b) =>
                                new Date(a.date).getTime() -
                                new Date(b.date).getTime()
                        )
                        .map((leave) => (
                            <Tr key={leave._id}>
                                <Td>
                                    {new Date(leave.date)
                                        .toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                        .split("/")
                                        .join("-")}
                                </Td>
                                <Td>{leave.reason}</Td>
                                <Td>
                                    <PopoverComponent
                                        description="Do you really want to delete this service?"
                                        action={{
                                            colorScheme: "red",
                                            text: "Delete",
                                            handler: () => {
                                                handleDelete(leave.date);
                                            },
                                        }}
                                    >
                                        <Button
                                            size={"xs"}
                                            colorScheme="red"
                                            ms={3}
                                        >
                                            <RiDeleteBin5Line />
                                        </Button>
                                    </PopoverComponent>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    ) : (
        <div className="w-full h-2/3 flex justify-center items-center">
            <Text textAlign={"center"} mt={5} color={"red.300"}>
                No upcoming leaves
            </Text>
        </div>
    )}

            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                title="Select Dates"
                action={{
                    color: "blue",
                    text: "Add",
                    onClick: handleNewLeaves,
                }}
            >
                <div className="">
                    <Box w={"300px"} h={"300px"}>
                        <Text fontWeight="bold">Select Dates:</Text>
                        <DatePicker
                            selected={null}
                            onChange={(date) => handleDateChange(date as Date)}
                            filterDate={isDayDisabled}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                            className="mt-2 p-2 border rounded-md"
                            inline
                            highlightDates={selectedDates}
                            maxDate={maxDate}
                            minDate={minDate}
                        />
                    </Box>
                    <Box>
                        <Text>Reason</Text>
                        <Input
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Box>
                    <Text mt={3}>Selected Dates:</Text>
                    <div className="flex flex-wrap">
                        {selectedDates.map((date) => (
                            <Text
                                key={date.toISOString()}
                                mx={1}
                                mb={2}
                                rounded={"md"}
                                px={2}
                                bg={"gray.200"}
                            >
                                {date
                                    .toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })
                                    .split("/")
                                    .join("-")}
                            </Text>
                        ))}
                    </div>
                </div>
            </ModalComponent>
        </div>
    );
};
