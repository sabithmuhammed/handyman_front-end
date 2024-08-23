import {
    Badge,
    Button,
    Flex,
    Grid,
    Input,
    StackDivider,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { PiChatsBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BookingType } from "../../types/stateTypes";
import ScheduleCard from "../../components/tradesman/ScheduleCard";
import { getCompleted, getSchedules } from "../../api/bookingApi";
import { MdOutlineClear } from "react-icons/md";
import PaginationButton from "../../components/user/common/PaginationButton";

const Schedules = () => {
    const [schedules, setSchedules] = useState<BookingType[]>([]);
    const [completed, setCompleted] = useState<BookingType[]>([]);
    const [parentState, setParentState] = useState(true);
    const [pendingDate, setPendingDate] = useState("");
    const [pendingPage, setPendingPage] = useState(1);
    const [pendingPageCount, setPendingPageCount] = useState(0);
    const [completedPage, setCompletedPage] = useState(1);
    const [completedPageCount, setCompletedPageCount] = useState(0);
    const [completedDate, setCompletedDate] = useState("");
    useEffect(() => {
        (async () => {
            const res = await getSchedules(pendingDate, pendingPage);
            if (res?.data) {
                setSchedules(res.data.bookings);
                setPendingPageCount(Math.ceil(res.data?.totalCount / 4));
            }
        })();
    }, [parentState, pendingDate, pendingPage]);

    useEffect(() => {
        (async () => {
            const res = await getCompleted(completedDate,completedPage);
            if (res?.data) {
                setCompleted(res.data.bookings);
                setCompletedPageCount(Math.ceil(res.data?.totalCount / 4));
            }
        })();
    }, [parentState, completedDate,completedPage]);

    const changeParentState = () => setParentState((prev) => !prev);
    return (
        <div className="text-gray-700">
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Pendings</Tab>
                    <Tab>Completed</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="mb-3 flex justify-end">
                            <Input
                                type="date"
                                w={"200px"}
                                bg={"white"}
                                boxShadow={"md"}
                                value={pendingDate}
                                onChange={(e) => {
                                    setPendingDate(e.target.value);
                                }}
                            />
                            {pendingDate && (
                                <Button
                                    size={"sm"}
                                    ms={2}
                                    onClick={() => {
                                        setPendingDate("");
                                    }}
                                >
                                    <MdOutlineClear />
                                </Button>
                            )}
                        </div>
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2,1fr)",
                                lg: "repeat(4, 1fr)",
                            }}
                            gap={3}
                        >
                            {schedules.length !== 0 ? (
                                schedules.map((booking) => (
                                    <ScheduleCard
                                        key={booking._id}
                                        {...booking}
                                        changeParentState={changeParentState}
                                    />
                                ))
                            ) : (
                                <Text>No pending bookings</Text>
                            )}
                        </Grid>
                        <div className="mt-7 mx-auto">
                            <PaginationButton
                                active={pendingPage}
                                pageCount={pendingPageCount}
                                setPage={setPendingPage}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mb-3 flex justify-end">
                            <Input
                                type="date"
                                w={"200px"}
                                bg={"white"}
                                boxShadow={"md"}
                                value={completedDate}
                                onChange={(e) => {
                                    setCompletedDate(e.target.value);
                                }}
                            />
                            {completedDate && (
                                <Button
                                    size={"sm"}
                                    ms={2}
                                    onClick={() => {
                                        setCompletedDate("");
                                    }}
                                >
                                    <MdOutlineClear />
                                </Button>
                            )}
                        </div>
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2,1fr)",
                                lg: "repeat(4, 1fr)",
                            }}
                            gap={3}
                        >
                            {completed.length !== 0 ? (
                                completed.map((booking) => (
                                    <ScheduleCard
                                        key={booking._id}
                                        {...booking}
                                        changeParentState={changeParentState}
                                        completed
                                    />
                                ))
                            ) : (
                                <Text>No completed bookings</Text>
                            )}
                        </Grid>
                        <div className="mt-7 mx-auto">
                            <PaginationButton
                                active={completedPage}
                                pageCount={completedPageCount}
                                setPage={setCompletedPage}
                            />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default Schedules;
