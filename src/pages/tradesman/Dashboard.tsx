import React, { useEffect, useState } from "react";
import { getProfileFull } from "../../api/tradesmanApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex, Grid, Hide, Select, Text } from "@chakra-ui/react";
import {
    IoIosArrowDropupCircle,
    IoIosArrowDropdownCircle,
} from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import LineChart from "../../components/tradesman/LineChart";
import PieChart from "../../components/tradesman/PieChart";
import { getAmountAggregation, getBookingsCount, getServiceCount } from "../../api/bookingApi";

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        labels: [],
        values: [],
    });
    const [lineSelect, setLineSelect] = useState("today");
    const [pieSelect, setPieSelect] = useState("today");
    const [pieData, setPieData] = useState({
        labels: [],
        values: [],
    });

    const [bookingData, setBookingData] = useState<{
        canceled: number;
        pending: number;
        completed: number;
        total: number;
    }>({
        canceled: 0,
        completed: 0,
        pending: 0,
        total: 0,
    });

    useEffect(() => {
        (async () => {
            const res = await getProfileFull();

            if (res?.data) {
                if (res.data.configuration.services.length === 0) {
                    toast.warning("Please edit the configurations");
                    navigate("../settings");
                }
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const res = await getServiceCount(pieSelect);

            if (res?.data) {
                const labels = res.data.map(({ _id }) => _id);
                const values = res.data.map(({ count }) => count);
                setPieData({ labels, values });
            }
        })();
    }, [pieSelect]);

    useEffect(() => {
        (async () => {
            const res = await getAmountAggregation(lineSelect);
            console.log(res?.data);
            

            if (res?.data) {
                const labels = res.data.map(({ _id }) => _id);
                const values = res.data.map(({ totalAmount }) => totalAmount);
                setData({ labels, values });
            }
        })();
    }, [lineSelect]);

    useEffect(() => {
        (async () => {
            const res = await getBookingsCount();
            if (res?.data) {
                const booking = {
                    canceled: 0,
                    completed: 0,
                    pending: 0,
                    total: 0,
                };
                res.data.forEach((item) => {
                    if (item._id === "canceled") {
                        booking.canceled = item.count;
                    }
                    if (item._id === "booked") {
                        booking.pending = item.count;
                    }
                    if (item._id === "completed") {
                        booking.completed = item.count;
                    }
                });
                booking.total =
                    booking.canceled + booking.completed + booking.pending;
                setBookingData(booking);
            }
        })();
    }, []);
    return (
        <div className=" text-gray-700">
            <Grid templateColumns={"repeat(4,1fr)"} gap={6}>
                <Grid
                    templateColumns={"repeat(3,1fr)"}
                    gap={2}
                    bg={"white"}
                    h={"80px"}
                    rounded={"md"}
                    boxShadow={"md"}
                    px={5}
                    borderBottom={"3px solid"}
                    borderColor={"blue.400"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    className="col-span-2 md:col-span-1"
                >
                    <div className="col-span-2">
                        <Text fontSize={"xs"} as={"b"}>
                            Total bookings
                        </Text>
                        <div className="flex text-blue-400">
                            <IoIosArrowDropupCircle size={25} />
                            <Text fontSize={"xl"} as={"b"} ms={2}>
                                {bookingData.total}
                            </Text>
                        </div>
                    </div>

                    <Hide below="md">
                        <Flex justify={"end"}>
                            <SlGraph size={40} className="text-blue-400" />
                        </Flex>
                    </Hide>
                </Grid>

                <Grid
                    templateColumns={"repeat(3,1fr)"}
                    gap={2}
                    bg={"white"}
                    h={"80px"}
                    rounded={"md"}
                    boxShadow={"md"}
                    px={5}
                    borderBottom={"3px solid"}
                    borderColor={"orange.400"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    className="col-span-2 md:col-span-1"
                >
                    <div className="col-span-2">
                        <Text fontSize={"xs"} as={"b"}>
                            Pending bookings
                        </Text>
                        <div className="flex text-orange-400">
                            <IoIosArrowDropupCircle size={25} />
                            <Text fontSize={"xl"} as={"b"} ms={2}>
                                {bookingData.pending}
                            </Text>
                        </div>
                    </div>

                    <Flex justify={"end"}>
                        <SlGraph size={40} className="text-orange-400" />
                    </Flex>
                </Grid>

                <Grid
                    templateColumns={"repeat(3,1fr)"}
                    gap={2}
                    bg={"white"}
                    h={"80px"}
                    rounded={"md"}
                    boxShadow={"md"}
                    px={5}
                    borderBottom={"3px solid"}
                    borderColor={"green.600"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    className="col-span-2 md:col-span-1"
                >
                    <div className=" col-span-2">
                        <Text fontSize={"xs"} as={"b"}>
                            Completed bookings
                        </Text>
                        <div className="flex text-green-600">
                            <IoIosArrowDropupCircle size={25} />
                            <Text fontSize={"xl"} as={"b"} ms={2}>
                                {bookingData.completed}
                            </Text>
                        </div>
                    </div>

                    <Flex justify={"end"}>
                        <SlGraph size={40} className="text-green-600" />
                    </Flex>
                </Grid>

                <Grid
                    templateColumns={"repeat(3,1fr)"}
                    gap={2}
                    bg={"white"}
                    h={"80px"}
                    rounded={"md"}
                    boxShadow={"md"}
                    px={5}
                    borderBottom={"3px solid"}
                    borderColor={"red.500"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    className="col-span-2 md:col-span-1"
                >
                    <div className="col-span-2">
                        <Text fontSize={"xs"} as={"b"}>
                            Canceled bookings
                        </Text>
                        <div className="flex text-red-500">
                            <IoIosArrowDropdownCircle size={25} />
                            <Text fontSize={"xl"} as={"b"} ms={2}>
                                {bookingData.canceled}
                            </Text>
                        </div>
                    </div>
                </Grid>

                <div className="col-span-3 bg-white rounded-md shadow-md h-[400px] px-5 py-3">
                    <div className=" flex justify-between">
                        <Text as={"b"}>Income Overview</Text>
                        <div className="w-[200px]">
                            <Select
                                value={lineSelect}
                                onChange={(e) => setLineSelect(e.target.value)}
                            >
                                <option value="today" selected>
                                    Today
                                </option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </Select>
                        </div>
                    </div>
                    <LineChart data={data} />
                </div>
                <div className="col-span-3 lg:col-span-1 bg-white h-[400px] rounded-md shadow-md">
                    <div className="">
                        <Select
                            value={pieSelect}
                            onChange={(e) => setPieSelect(e.target.value)}
                        >
                            <option value="today" selected>
                                Today
                            </option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </Select>
                    </div>
                    <PieChart data={pieData} />
                </div>
            </Grid>
        </div>
    );
};

export default Dashboard;
