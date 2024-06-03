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

const PostCard = () => {
    const [commentOpen, setCommentOpen] = useState(false);
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
                            name="Jan Sbrahmov"
                            // src="https://bit.ly/dan-abramov"
                        />
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"}>
                            <Text fontSize={"md"} fontWeight={"bold"}>
                                Sabith Muhammed
                            </Text>
                            <Text fontSize={"sm"} color={"gray.600"}>
                                date-date-date
                            </Text>
                        </Flex>
                    </WrapItem>
                </Wrap>
                <Link to="/" className="underline text-blue-900">
                    Go to profile
                </Link>
            </Flex>
            <Text noOfLines={[1, 2, 3]} py={3}>
                fhsdjhf fkjsdhfkj fjdshafk hfdssjfhkjs fdsjhf
                <br />
                jfafhdsjahfjdsafadsfsadkfdskalfdsklafhlksdalaskljd
                <br />
            </Text>
            <Box w={"full"} bg={"gray.200"} h={"400px"}>
                <img
                    src="https://cdn.shopify.com/s/files/1/0565/4039/7655/files/wall_painting_ideas_77.png"
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
