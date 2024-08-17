import {
    Button,
    Divider,
    Input,
    NumberInput,
    NumberInputField,
    Switch,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Tradesman, WorkingDayType } from "../../types/stateTypes";
import { PopoverComponent } from "../common/PopoverComponent";
import { toast } from "react-toastify";
import { updateWorkingTime } from "../../api/tradesmanApi";

type PropType = {
    workingDaysProp: WorkingDayType[];
    slotSizeProp: number;
    bufferTimeProp: number;
    setTradesman: React.Dispatch<
        React.SetStateAction<Tradesman | null | undefined>
    >;
};

export const WorkingDaysTile = ({
    workingDaysProp,
    slotSizeProp,
    bufferTimeProp,
    setTradesman,
}: PropType) => {
    const [dayOfWeek, setDayOfWeek] = useState([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]);

    const [workingDays, setWorkingDays] = useState([...workingDaysProp]);
    const [slotSize, setSlotSize] = useState(String(slotSizeProp));
    const [bufferTime, setBufferTime] = useState(bufferTimeProp);
    const [loading, setLoading] = useState(false);

    const [readOnly, setReadOnly] = useState(true);

    const handleCancel = () => {
        setWorkingDays(workingDaysProp);
        setReadOnly(true);
    };

    const handleSave = async () => {
        const timeIsCorrect = workingDays.every(({ start, end, isWorking }) => {
            const startTime = new Date(`1970-01-01T${start}:00`);
            const endTime = new Date(`1970-01-01T${end}:00`);
            return isWorking ? endTime > startTime : true;
        });
        if (!timeIsCorrect) {
            toast.error("Ending time can't be earlier than starting time");
            return;
        }
        setLoading(true);
        const res = await updateWorkingTime({
            workingDays,
            slotSize: Number(slotSize),
            bufferTime,
        });
        if (res?.data) {
            toast.success("Working time updated");
            setTradesman(res.data);
        }
        setReadOnly(true);
        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 md:row-span-2">
            <div className=" flex justify-between mb-4">
                <Text as={"b"}>Working days</Text>
                {readOnly ? (
                    <Button
                        size={"sm"}
                        onClick={() => setReadOnly(false)}
                        variant={"outline"}
                    >
                        Edit
                    </Button>
                ) : (
                    <div>
                        <PopoverComponent
                            description="Do you really want to discard the changes?"
                            action={{
                                colorScheme: "red",
                                handler: handleCancel,
                                text: "Discard",
                            }}
                        >
                            <Button
                                size={"sm"}
                                onClick={() => setReadOnly(false)}
                                colorScheme="red"
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                        </PopoverComponent>

                        <PopoverComponent
                            description="Do you really want to save the changes?"
                            action={{
                                colorScheme: "blue",
                                handler: handleSave,
                                text: "Save",
                            }}
                        >
                            <Button
                                size={"sm"}
                                ms={3}
                                onClick={() => setReadOnly(false)}
                                colorScheme="blue"
                                variant={"outline"}
                                isLoading={loading}
                            >
                                Save
                            </Button>
                        </PopoverComponent>
                    </div>
                )}
            </div>
            {workingDays.length !== 0 &&
                workingDays.map((day, index) => (
                    <div key={day._id}>
                        <div className="mb-2 flex justify-between mx-4 flex-wrap">
                            <Switch
                                isChecked={day.isWorking}
                                colorScheme="gray"
                                mb={2}
                                readOnly={readOnly}
                                onChange={() =>
                                    setWorkingDays((p) => {
                                        const newArr = [...p];
                                        newArr[index] = {
                                            ...newArr[index],
                                            isWorking: !newArr[index].isWorking,
                                        };
                                        return newArr;
                                    })
                                }
                            >
                                <Text
                                    display={"inline-block"}
                                    color={!day.isWorking ? "gray.400" : ""}
                                >
                                    {dayOfWeek[index]}
                                </Text>
                            </Switch>
                            <div className="flex  ms-4 flex-wrap">
                                <div className="flex ms-3 items-center mb-1">
                                    <Text
                                        me={2}
                                        fontSize={"sm"}
                                        color={!day.isWorking ? "gray.400" : ""}
                                    >
                                        From:
                                    </Text>
                                    <Input
                                        size={"sm"}
                                        value={day.start}
                                        type="time"
                                        isDisabled={!day.isWorking}
                                        readOnly={readOnly}
                                        onChange={(e) =>
                                            setWorkingDays((p) => {
                                                const newArr = [...p];
                                                newArr[index] = {
                                                    ...newArr[index],
                                                    start: e.target.value,
                                                };
                                                return newArr;
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex ms-3 items-center mb-1">
                                    <Text
                                        me={2}
                                        fontSize={"sm"}
                                        color={!day.isWorking ? "gray.400" : ""}
                                    >
                                        To:
                                    </Text>
                                    <Input
                                        size={"sm"}
                                        value={day.end}
                                        type="time"
                                        isDisabled={!day.isWorking}
                                        readOnly={readOnly}
                                        onChange={(e) =>
                                            setWorkingDays((p) => {
                                                const newArr = [...p];
                                                newArr[index] = {
                                                    ...newArr[index],
                                                    end: e.target.value,
                                                };
                                                return newArr;
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <Divider my={2} />
                    </div>
                ))}
            <div className="flex gap-4">
                <div className="">
                    <Text fontSize={"sm"}>Slot size (in hour)</Text>
                    <NumberInput
                        min={1}
                        max={24}
                        precision={2}
                        size={"sm"}
                        value={slotSize}
                        onChange={(value) => setSlotSize(value)}
                    >
                        <NumberInputField readOnly={readOnly} />
                    </NumberInput>
                </div>
                <div className="">
                    <Text fontSize={"sm"}>Buffer Time (in minute)</Text>
                    <NumberInput
                        min={0}
                        max={24 * 60}
                        size={"sm"}
                        value={bufferTime}
                        onChange={(value) => setBufferTime(Number(value))}
                    >
                        <NumberInputField readOnly={readOnly} />
                    </NumberInput>
                </div>
            </div>
        </div>
    );
};
