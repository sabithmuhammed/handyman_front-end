import {
    Avatar,
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
                            image: res.data?.profile || "" ,
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

    return (
        <Flex
            bg={chat == conversation._id ? `gray.500` : `white`}
            p={2}
            rounded={"md"}
            cursor={"pointer"}
            onClick={() => handleChatChange(conversation._id as string)}
            boxShadow={"md"}
            alignItems={"center"}
        >
            {" "}
            {userInfo && (
                <>
                    <WrapItem>
                        <Avatar
                            name={userInfo.name}
                            src={userInfo.image}
                            size={"md"}
                        />
                    </WrapItem>
                    <WrapItem ms={2}>
                        <Flex direction={"column"}>
                            <Flex direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"}>
                                    {userInfo.name}
                                </Text>
                                <Text fontSize={"sm"} color={"gray.600"} noOfLines={1}>
                                    {conversation.lastMessage}
                                </Text>
                            </Flex>
                        </Flex>
                    </WrapItem>
                </>
            )}
        </Flex>
    );
};

export default List;
