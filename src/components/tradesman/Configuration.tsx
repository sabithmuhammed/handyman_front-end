import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useBoolean,
    VStack,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { PiCameraBold } from "react-icons/pi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRegClock } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa6";
import { TbPlaylistAdd } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { ConfigurationType, Tradesman } from "../../types/stateTypes";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { updateConfiguration } from "../../api/tradesmanApi";

const Configuration = ({
    workingDays,
    startingTime,
    endingTime,
    bufferTime,
    slotSize,
    services,
    updateTradesman
}: ConfigurationType & {updateTradesman:(tradesman:Tradesman)=>void}) => {
    const [viewMode, setViewMode] = useState(true);
    const [days, setDays] = React.useState([...workingDays]);
    const dayOfWeek = useMemo(
        () => [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        []
    );
    const [start, setStart] = useState(startingTime);
    const [end, setEnd] = useState(endingTime);
    const [buffer, setBuffer] = useState(bufferTime);
    const [slot, setSlot] = useState(slotSize);
    const [service, setService] = useState([...services]);

    const checkDays = (index: number, value: boolean) => {
        setDays((p) =>
            p.map((day, i) => {
                if (i === index) {
                    return value;
                }
                return day;
            })
        );
    };

    const allChecked = days.every(Boolean);
    const isIndeterminate = days.some(Boolean) && !allChecked;

    const addServiceItem = () => {
        const noEmpty = service.every(
            (item) => item.description && item.amount && item.slots
        );
        if (noEmpty) {
            setService([
                ...service,
                { description: "", amount: "", slots: "1" },
            ]);
        } else {
            toast.error("Please fill existing fields");
        }
    };

    const removeServiceItem = (index: number) => {
        const newService = service.filter((_, i) => i !== index);
        setService(newService);
    };

    const updateService = (
        value: string | number,
        index: number,
        type: "description" | "amount" | "slot"
    ) => {
        const newService = service.map((item, i) => {
            if (i === index) {
                if (type == "description") {
                    item.description = value as string;
                } else if (type == "amount") {
                    item.amount = value as string;
                } else {
                    item.slots = value as string;
                }
            }
            return item;
        });
        setService(newService);
    };
    const onCancelPress = () => {
        setStart(startingTime);
        setEnd(endingTime);
        setDays([...workingDays]);
        setSlot(slotSize);
        setBuffer(bufferTime);
        setService([...services]);
        setViewMode(true);
    };

    const onSubmit = async () => {
        let hasError = false;
        if (start >= end) {
            toast.error("Invalid working time");
            hasError = true;
        }
        if (days.every((day) => !day)) {
            toast.error("Select atleast 1 day of the week");
            hasError = true;
        }
        if (Number(slot) < 0.5) {
            toast.error("Slot size is too short");
            hasError = true;
        }
        const allFilled = service.every(
            (item) => item.description && item.amount && item.slots
        );
        if (!allFilled) {
            toast.error("Please fill all the fields");
            hasError = true;
        }
        if (hasError) {
            return;
        }

        const res = await updateConfiguration({
            startingTime: start,
            endingTime: end,
            bufferTime: buffer,
            services: service,
            slotSize: slot,
            workingDays: days,
        });
        if(res?.data){
            toast.success("Successfully updated");
            setViewMode(true)
            updateTradesman(res.data)
        }
    };

    return (
        <div className="w-full max-w-[500px] bg-white p-3">
            {viewMode && (
                <Flex mb={4}>
                    <button
                        className="ms-auto bg-slate-400 p-1 text-white rounded-md"
                        onClick={() => setViewMode(false)}
                    >
                        <CiEdit size={25} />
                    </button>
                </Flex>
            )}
            <Flex w={"full"} direction={"column"}>
                <Text mb={2}>Working Time:</Text>
                <Flex alignItems={"center"} mb={4}>
                    <InputGroup size={"sm"}>
                        <InputLeftElement pointerEvents="none">
                            <FaRegClock />
                        </InputLeftElement>
                        <Input
                            type="time"
                            placeholder="Starting time"
                            readOnly={viewMode}
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </InputGroup>
                    <Text mx={3}>to</Text>
                    <InputGroup size={"sm"}>
                        <InputLeftElement pointerEvents="none">
                            <FaRegClock />
                        </InputLeftElement>
                        <Input
                            type="time"
                            placeholder="Ending time"
                            readOnly={viewMode}
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </InputGroup>
                </Flex>
                <Text>Working Days:</Text>
                <Flex direction={"column"}>
                    <div className="space-y-2 mb-4 mt-2">
                        <Checkbox
                            size={"sm"}
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) =>
                                setDays((p) => p.map((_) => e.target.checked))
                            }
                            disabled={viewMode}
                        >
                            Select All
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            {days.map((day, index) => (
                                <Checkbox
                                    size={"sm"}
                                    key={index}
                                    isChecked={day}
                                    onChange={(e) =>
                                        checkDays(index, e.target.checked)
                                    }
                                    disabled={viewMode}
                                >
                                    {dayOfWeek[index]}
                                </Checkbox>
                            ))}
                        </Stack>
                    </div>
                </Flex>
                <div className="flex">
                    <div className="me-3">
                        <Text>Slot size</Text>
                        <InputGroup size={"sm"}>
                            <InputLeftElement pointerEvents="none">
                                <FaRegClock />
                            </InputLeftElement>
                            <Input
                                type="number"
                                placeholder="Slot size"
                                readOnly={viewMode}
                                value={slot}
                                onChange={(e) =>
                                    setSlot(Number(e.target.value))
                                }
                            />
                            <InputRightElement me={3}>Hrs</InputRightElement>
                        </InputGroup>
                    </div>
                    <div className="">
                        <Text>Buffer time</Text>
                        <InputGroup size={"sm"}>
                            <InputLeftElement pointerEvents="none">
                                <FaRegClock />
                            </InputLeftElement>
                            <Input
                                type="number"
                                placeholder="Buffer time"
                                readOnly={viewMode}
                                value={buffer}
                                onChange={(e) =>
                                    setBuffer(Number(e.target.value))
                                }
                            />
                            <InputRightElement me={3}>Mins</InputRightElement>
                        </InputGroup>
                    </div>
                </div>
                <div className="mt-3">
                    <Text>Services</Text>
                    {service.length !== 0 ? (
                        service.map((item, index) => (
                            <div className="grid grid-cols-8 gap-3 mb-2">
                                <InputGroup size={"sm"} className="col-span-3">
                                    <InputLeftElement pointerEvents="none">
                                        <FaToolbox color="green" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        readOnly={viewMode}
                                        value={item.description}
                                        onChange={(e) =>
                                            updateService(
                                                e.target.value,
                                                index,
                                                "description"
                                            )
                                        }
                                    />
                                </InputGroup>
                                <InputGroup size={"sm"} className="col-span-2">
                                    <InputLeftElement pointerEvents="none">
                                        <LiaRupeeSignSolid color="green" />
                                    </InputLeftElement>
                                    <Input
                                        type="number"
                                        placeholder="Amount"
                                        readOnly={viewMode}
                                        value={item.amount}
                                        onChange={(e) => {
                                            if (/^\d+$/.test(e.target.value)) {
                                                updateService(
                                                    e.target.value,
                                                    index,
                                                    "amount"
                                                );
                                            } else if (e.target.value == "") {
                                                updateService(
                                                    e.target.value,
                                                    index,
                                                    "amount"
                                                );
                                            }
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup size={"sm"} className="col-span-2">
                                    <Input
                                        type="number"
                                        readOnly={viewMode}
                                        value={item.slots}
                                        onChange={(e) => {
                                            if (/^\d+$/.test(e.target.value)) {
                                                updateService(
                                                    e.target.value,
                                                    index,
                                                    "slot"
                                                );
                                            } else if (e.target.value == "") {
                                                updateService(
                                                    e.target.value,
                                                    index,
                                                    "slot"
                                                );
                                            }
                                        }}
                                    />
                                    <InputRightElement pointerEvents="none">
                                        <Text>Slot(s)</Text>
                                    </InputRightElement>
                                </InputGroup>
                                {!viewMode && (
                                    <button
                                        className="ms-2 bg-red-500 text-white h-full"
                                        onClick={() => removeServiceItem(index)}
                                    >
                                        <IoMdClose className="mx-auto" />
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <Text align={"center"} fontSize={"sm"} my={3}>
                            Please add at least 1 service
                        </Text>
                    )}
                    {!viewMode && (
                        <button>
                            <TbPlaylistAdd size={25} onClick={addServiceItem} />
                        </button>
                    )}
                </div>
                {!viewMode && (
                    <Flex justifyContent={"end"} mt={3}>
                        <Button
                            me={3}
                            colorScheme="red"
                            size={"sm"}
                            onClick={onCancelPress}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            size={"sm"}
                            onClick={onSubmit}
                        >
                            Save
                        </Button>
                    </Flex>
                )}
            </Flex>
        </div>
    );
};

export default Configuration;
