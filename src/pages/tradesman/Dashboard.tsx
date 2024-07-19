import React, { useEffect } from "react";
import { getProfileFull } from "../../api/tradesmanApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex, Grid, Hide, Text } from "@chakra-ui/react";
import {
    IoIosArrowDropupCircle,
    IoIosArrowDropdownCircle,
} from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import LineChart from "../../components/tradesman/LineChart";
import PieChart from "../../components/tradesman/PieChart";

const Dashboard = () => {
    const navigate = useNavigate();
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        values: [65, 59, 80, 81, 56, 55, 40],
    };

    const pieData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        values: [300, 50, 100, 40, 120, 180],
    };
    useEffect(() => {
        (async () => {
            const res = await getProfileFull();
            console.log(res?.data);

            if (res?.data) {
                if (res.data.configuration.services.length === 0) {
                    toast.warning("Please edit the configurations");
                    navigate("../settings");
                }
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
                                7,200
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
                                72
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
                                7,200
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
                                10
                            </Text>
                        </div>
                    </div>
                </Grid>

                <div className="col-span-3 bg-white rounded-md shadow-md h-[400px] px-5 py-3">
                    <div className="">
                        <Text>Income Overview</Text>
                    </div>
                    <LineChart data={data} />
                </div>
                <div className="col-span-1 bg-white h-[400px] rounded-md shadow-md">
                    <PieChart data={pieData} />
                </div>
            </Grid>
        </div>
    );
};

export default Dashboard;
