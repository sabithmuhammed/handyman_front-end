import {
    Avatar,
    Badge,
    Box,
    Flex,
    GridItem,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ConversationType, ReceiverType } from "../../../types/stateTypes";
import { getTradesmen, getUserDetails } from "../../../api/userApi";
import { getProfileMinimum } from "../../../api/tradesmanApi";

type PropType = {
    chat: string;
    setChat: React.Dispatch<React.SetStateAction<string>>;
    conversation: ConversationType;
    senderId: string;
    setReceiverInfo: React.Dispatch<React.SetStateAction<ReceiverType>>;
};

const List = ({
    chat,
    setChat,
    conversation,
    senderId,
    setReceiverInfo,
}: PropType) => {
    const handleChatChange = (id: string) => {
        setChat(id);
        setReceiverInfo({
            receiverId: user as string,
            image: userInfo?.image as string,
            name: userInfo?.name as string,
        });
    };
    const [userInfo, setUserInfo] = useState<{
        image: string;
        name: string;
    } | null>(null);
    const [user, setUser] = useState<string>();
    useEffect(() => {
        conversation.members.forEach((user) => {
            if (user !== senderId) {
                setUser(() => user);
            }
        });
    }, []);
    useEffect(() => {
        (async () => {
            if (user) {
                if (user === conversation.tradesmanId) {
                    const res = await getProfileMinimum(user);

                    if (res?.data) {
                        setUserInfo({
                            image: res.data.profile,
                            name: res.data.name,
                        });
                        if (chat == conversation._id) {
                            setReceiverInfo({
                                receiverId: user,
                                image: res.data.profile,
                                name: res.data.name,
                            });
                        }
                    }
                } else {
                    const res = await getUserDetails(user);
                    if (res?.data) {
                        setUserInfo({
                            image: res.data?.profile || "",
                            name: res.data.name,
                        });
                        if (chat == conversation._id) {
                            setReceiverInfo({
                                receiverId: user,
                                image: res.data?.profile || "",
                                name: res.data.name,
                            });
                        }
                    }
                }
            }
        })();
    }, [user]);

    return conversation.lastMessage ? (
        <Flex
            bg={chat == conversation._id ? `gray.200` : `white`}
            p={2}
            // rounded={"md"}
            cursor={"pointer"}
            onClick={() => handleChatChange(conversation._id as string)}
            boxShadow={"md"}
            alignItems={"center"}
            w={"full"}
        >
            {" "}
            {userInfo && (
                <Flex w={"full"} h={"16"}  alignItems={"center"}>
                    <Avatar
                        name={userInfo.name}
                        src={userInfo.image}
                        size={"md"}
                    />
                    <Flex
                        direction={"column"}
                        h={"full"}
                        flexGrow={1}
                        ms={2}
                        py={2}
                    >
                        <Flex justifyContent={"space-between"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>
                                {userInfo.name}
                            </Text>
                            <Text
                                fontSize={"xs"}
                                color={"gray.600"}
                                noOfLines={1}
                                as={"b"}
                                
                                
                            >
                                {new Date(
                                    conversation.updatedAt
                                ).toLocaleString("en-AU", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </Text>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <Text
                                fontSize={"sm"}
                                color={"gray.600"}
                                noOfLines={1}
                                me={6}
                            >
                                {conversation.lastMessage}
                            </Text>
                            <div className="w-3 h-3 p-2 bg-green-600 text-white flex justify-center items-center rounded-full text-xs font-bold">
                                3
                            </div>
                        </Flex>
                    </Flex>
                </Flex>
                // <>
                //     <WrapItem>
                //         <Avatar
                //             name={userInfo.name}
                //             src={userInfo.image}
                //             size={"md"}
                //         />
                //     </WrapItem>
                //     <WrapItem ms={2}>
                //         <Flex direction={"column"}>
                //             <Flex direction={"column"}>
                //                 <Text fontSize={"sm"} fontWeight={"bold"}>
                //                     {userInfo.name}
                //                 </Text>
                //                 <Flex justifyContent={"space-between"} >
                //                     <Text
                //                         fontSize={"sm"}
                //                         color={"gray.600"}
                //                         noOfLines={1}
                //                         me={6}
                //                     >
                //                         {conversation.lastMessage}
                //                     </Text>
                //                     <Text
                //                         fontSize={"sm"}
                //                         color={"gray.600"}
                //                         noOfLines={1}
                //                     >
                //                         {new Date(
                //                             conversation.updatedAt
                //                         ).toLocaleString("en-AU", {
                //                             day: "2-digit",
                //                             month: "2-digit",
                //                             year: "numeric",
                //                         })}
                //                     </Text>
                //                 </Flex>
                //             </Flex>
                //         </Flex>
                //     </WrapItem>
                // </>
            )}
        </Flex>
    ) : (
        <></>
    );
};

export default List;
