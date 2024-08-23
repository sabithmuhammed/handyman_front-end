import {
    Box,
    Flex,
    Grid,
    GridItem,
    Skeleton,
    SkeletonText,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/user/common/PostCard";
import ProfileTile from "../../components/user/Tradesman/ProfileTile";
import { PostType, Tradesman } from "../../types/stateTypes";
import { getProfileMinimum } from "../../api/tradesmanApi";
import NoPosts from "../../components/common/NoPosts";
import Calendar from "../../components/user/common/Calendar";
import BookingForm from "../../components/user/Tradesman/BookingForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getScheduledDates } from "../../api/bookingApi";
import { getPostsById } from "../../api/postApi";
import Slots from "../../components/user/Tradesman/Slots";
import { ReviewContainer } from "../../components/user/Tradesman/ReviewContainer";
import TradesmanTileSkeleton from "../../components/skeletons/TradesmanTileSkeleton";

const TradesmanProfile = () => {
    const [tradesman, setTradesman] = useState<Tradesman>();
    const [posts, setPosts] = useState<PostType[]>([]);
    const { tradesmanId } = useParams();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [service, setService] = useState<{
        description: string;
        slots: string;
        amount: string;
    }>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (tradesmanId) {
                const res = await getProfileMinimum(tradesmanId);
                if (res?.data) {
                    setTradesman(res.data);
                    return;
                }
            }
            navigate(-1);
        })();
    }, []);

    //change this

    useEffect(() => {
        (async () => {
            if (tradesmanId) {
                const res = await getPostsById(tradesmanId);
                if (res?.data) {
                    setPosts(res.data);

                    return;
                }
            }
            navigate(-1);
        })();
    }, []);

    const bookedSuccessfully = () => {
        setSelectedDate(null);
        setSelectedSlots([]);
        setService(undefined);
    };

    return (
        <div className="pt-12 lg:pt-20 pb-7 min-h-screen">
            <Grid
                templateColumns={{ lg: "repeat(3, 1fr)" }}
                gap={{ base: 3, lg: 6 }}
                px={2}
            >
                {tradesman ? (
                    <ProfileTile {...tradesman} />
                ) : (
                    <TradesmanTileSkeleton />
                )}
                <GridItem w="100%" bg="" colSpan={{ base: 1, lg: 2 }}>
                    <Grid gap={4}>
                        <Box
                            w={"full"}
                            bg={"white"}
                            boxShadow={"xl"}
                            rounded={6}
                            className="grid grid-cols-1 lg:grid-cols-2 "
                        >
                            {/* <Calendar specialDates={scheduledDates} /> */}
                            {tradesman?.configuration && (
                                <Slots
                                    {...tradesman.configuration}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    selectedSlots={selectedSlots}
                                    setSelectedSlots={setSelectedSlots}
                                    setService={setService}
                                    tradesmanId={tradesmanId as string}
                                />
                            )}
                            {userInfo ? (
                                <BookingForm
                                    selectedDate={selectedDate}
                                    selectedSlots={selectedSlots}
                                    service={service}
                                    bookedSuccessfully={bookedSuccessfully}
                                />
                            ) : (
                                <div className="bg-gray-100 rounded-md flex justify-center items-center">
                                    <Text fontSize={"lg"}>
                                        Login to book this tradesman
                                    </Text>
                                </div>
                            )}
                        </Box>
                        <Tabs
                            isFitted
                            variant="enclosed"
                            isLazy
                            boxShadow={"lg"}
                            rounded={"md"}
                        >
                            <TabList>
                                <Tab _selected={{ bg: "white" }}>Posts</Tab>
                                <Tab _selected={{ bg: "white" }}>Reviews</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {posts.length !== 0 && tradesman ? (
                                        posts.map((post) => (
                                            <PostCard
                                                key={post._id}
                                                {...tradesman}
                                                {...post}
                                            />
                                        ))
                                    ) : (
                                        <NoPosts />
                                    )}
                                </TabPanel>
                                <TabPanel bg={"white"}>
                                    <ReviewContainer />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    );
};

export default TradesmanProfile;
