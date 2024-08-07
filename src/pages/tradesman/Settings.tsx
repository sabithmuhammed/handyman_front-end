import {
    Button,
    Checkbox,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Switch,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Profile from "../../components/tradesman/Profile";
import Configuration from "../../components/tradesman/Configuration";
import { Tradesman } from "../../types/stateTypes";
import { getProfileFull } from "../../api/tradesmanApi";
import { FaToolbox } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

const Settings = () => {
    const [tradesman, setTradesman] = useState<Tradesman | null>();
    useEffect(() => {
        (async () => {
            const res = await getProfileFull();
            console.log(res?.data);

            if (res?.data) {
                setTradesman(res.data);
            }
        })();
    }, []);
    const updateTradesman = (tradesman: Tradesman) => {
        setTradesman(tradesman);
    };
    const [dayOfWeek, setDayOfWeek] = useState([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]);
    const [workingDays, setWorkingDays] = useState([
        {
            isWorking: false,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
        {
            isWorking: true,
            start: "09:00",
            end: "16:00",
        },
    ]);
    return (
        <div className="relative min-h-full h-fit">
            {
                // <Tabs
                //     isManual
                //     variant="enclosed"
                //     position={"relative"}
                //     h={"full"}
                //     p={0}
                // >
                //     <TabList>
                //         {/* <Tab>Profile</Tab> */}
                //         <Tab>Configurations</Tab>
                //     </TabList>
                //     <TabPanels h={"full"} p={0} pt={0}>
                //         {/* <TabPanel w={"full"}>
                //             <div className="flex justify-center w-full">
                //                 <Profile />
                //             </div>
                //         </TabPanel> */}
                //         <TabPanel w={"full"} h={"full"} p={0} >
                //             <div className="flex justify-center w-full">
                //                 {tradesman && tradesman.configuration && (
                //                     <Configuration {...tradesman.configuration} updateTradesman={updateTradesman} />
                //                 )}
                //             </div>
                //         </TabPanel>
                //     </TabPanels>
                // </Tabs>
            }
            <div className="grid grid-cols-1  md:grid-cols-2 h-full gap-3  text-gray-800">
                <div className="bg-white rounded-lg shadow-lg p-4 md:row-span-2">
                    <Text as={"b"} mb={2}>
                        Working days
                    </Text>
                    {workingDays.length !== 0 &&
                        workingDays.map((day, index) => (
                            <div key={"checkDiv" + index}>
                                <div className="mb-2 flex justify-between mx-4 flex-wrap">
                                    <Switch
                                        isChecked={day.isWorking}
                                        colorScheme="gray"
                                        mb={2}
                                        readOnly
                                        onChange={() =>
                                            setWorkingDays((p) => {
                                                const newArr = [...p];
                                                newArr[index] = {
                                                    ...newArr[index],
                                                    isWorking:
                                                        !newArr[index]
                                                            .isWorking,
                                                };
                                                return newArr;
                                            })
                                        }
                                    >
                                        <Text
                                            display={"inline-block"}
                                            color={
                                                !day.isWorking ? "gray.400" : ""
                                            }
                                        >
                                            {dayOfWeek[index]}
                                        </Text>
                                    </Switch>
                                    <div className="flex  ms-4 flex-wrap">
                                        <div className="flex ms-3 items-center mb-1">
                                            <Text
                                                me={2}
                                                fontSize={"sm"}
                                                color={
                                                    !day.isWorking
                                                        ? "gray.400"
                                                        : ""
                                                }
                                            >
                                                From:
                                            </Text>
                                            <Input
                                                size={"sm"}
                                                value={day.start}
                                                type="time"
                                                isDisabled={!day.isWorking}
                                            />
                                        </div>
                                        <div className="flex ms-3 items-center mb-1">
                                            <Text
                                                me={2}
                                                fontSize={"sm"}
                                                color={
                                                    !day.isWorking
                                                        ? "gray.400"
                                                        : ""
                                                }
                                            >
                                                To:
                                            </Text>
                                            <Input
                                                size={"sm"}
                                                value={day.end}
                                                type="time"
                                                isDisabled={!day.isWorking}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Divider my={2} />
                            </div>
                        ))}
                    <div className="flex gap-4">
                        <div className="">
                            <Text fontSize={"sm"}>Slot size</Text>
                            <Input size={"sm"}></Input>
                        </div>
                        <div className="">
                            <Text fontSize={"sm"}>Buffer Time</Text>
                            <Input size={"sm"}></Input>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 h-[85vh] overflow-auto">
                    <div className="bg-white rounded-lg shadow-lg p-3 ">
                        <Text as={"b"}>Services</Text>
                        {/* <TableContainer>
                            <Table size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Service</Th>
                                        <Th isNumeric>Slots needed</Th>
                                        <Th isNumeric>Amount (&#8377;)</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Tap fitting</Td>
                                        <Td isNumeric>1</Td>
                                        <Td isNumeric>300</Td>
                                        <Td>
                                            <Button size={"xs"}>
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button
                                                size={"xs"}
                                                colorScheme="red"
                                                ms={3}
                                            >
                                                <RiDeleteBin5Line />
                                            </Button>
                                        </Td>
                                    </Tr>
                                    
                                </Tbody>
                            </Table>
                        </TableContainer> */}
                        <div className="w-full h-2/3 flex justify-center items-center">
                            <Text textAlign={"center"} mt={5} color={"red.300"}>
                                No services
                            </Text>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-3 min-h-28">
                        <Text as={"b"}>Upcoming Off-days</Text>
                        <div className="w-full h-2/3 flex justify-center items-center">
                            <Text textAlign={"center"} mt={5} color={"red.300"}>
                                No Off-days
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
