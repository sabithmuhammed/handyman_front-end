import {
    Avatar,
    Box,
    Flex,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiComment, BiLike, BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";
import { PostType } from "../../../types/stateTypes";

const PostCard = ({ text, image, date,name,profile, }: PostType & {name:string |undefined,profile:string |undefined}) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
   
    return (
        <Box
            w={"full"}
            bg={"white"}
            boxShadow={"xl"}
            rounded={6}
            p={6}
            h={"fit-content"}
        >
            <Flex justifyContent={"space-between"}>
                <Wrap>
                    <WrapItem>
                        <Avatar
                            name={name}
                            src={profile}
                        />
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"}>
                            <Text fontSize={"md"} fontWeight={"bold"}>
                                {name}
                            </Text>
                            <Text fontSize={"sm"} color={"gray.600"}>
                                {formattedDate}
                            </Text>
                        </Flex>
                    </WrapItem>
                </Wrap>
            </Flex>
            <Text noOfLines={[1, 2, 3]} py={3}>
                {text}
            </Text>
            <Box w={"full"} bg={"gray.200"} h={{base:"200px",sm:"400px"}} >
                <img
                    src={image}
                    alt=""
                    className="object-contain w-full h-full"
                />
            </Box>
            <Stack direction="row" spacing={4} py={3}>
                <Flex>
                    <button className="mx-2">
                        <BiLike size={20} />
                    </button>
                    <Text fontSize={"sm"}>40</Text>
                </Flex>
                <Flex>
                    <button
                        className="mx-2"
                        onClick={() => setCommentOpen((c) => !c)}
                    >
                        <BiComment size={20} />
                    </button>
                    <Text fontSize={"sm"}>40</Text>
                </Flex>
                <Flex>
                    <button className="mx-2">
                        <BiLink size={20} />
                    </button>
                </Flex>
            </Stack>
            {commentOpen && <CommentSection />}
        </Box>
    );
};

export default PostCard;
