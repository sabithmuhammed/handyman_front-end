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
import React from "react";
import { FiSearch } from "react-icons/fi";

type PropType = {
    chat: string;
    setChat: React.Dispatch<React.SetStateAction<string>>;
};

const List = ({ chat, setChat }: PropType) => {
    const handleChatChange = (id: string) => {
        setChat(id);
    };
    return (
        <GridItem w="100%" colSpan={1}>
            <Flex
                h={"85vh"}
                w={"full"}
                className="bg-indigo-200"
                rounded={10}
                py={6}
                overflow={"auto"}
                boxShadow={"md"}
                direction={"column"}
            >
                <Box px={6}>
                    <InputGroup boxShadow={"md"}>
                        <InputLeftElement pointerEvents="none">
                            <FiSearch color="gray.300" />
                        </InputLeftElement>
                        <Input
                            type="search"
                            placeholder="search..."
                            bg={"white"}
                        />
                    </InputGroup>
                </Box>
                <Stack spacing={4} mt={3} overflow={"auto"} px={6}>
                    <Wrap
                        bg={chat == `abc` ? `gray.500` : `white`}
                        p={2}
                        rounded={"md"}
                        cursor={"pointer"}
                        onClick={() => handleChatChange("abc")}
                        boxShadow={"md"}
                    >
                        <WrapItem>
                            <Avatar
                                name="Dan Abrahmov"
                                src="https://bit.ly/dan-abramov"
                                size={"md"}
                            />
                        </WrapItem>
                        <WrapItem>
                            <Flex direction={"column"}>
                                <Flex direction={"column"}>
                                    <Text fontSize={"sm"} fontWeight={"bold"}>
                                        Sabith Muhammed
                                    </Text>
                                    <Text fontSize={"xs"} color={"gray.600"}>
                                        12/4/4000
                                    </Text>
                                </Flex>
                            </Flex>
                        </WrapItem>
                    </Wrap>
                    <Wrap
                        bg={"white"}
                        p={2}
                        rounded={"md"}
                        onClick={() => handleChatChange("abd")}
                        boxShadow={"md"}
                    >
                        <WrapItem>
                            <Avatar
                                name="Dan Abrahmov"
                                src="https://bit.ly/dan-abramov"
                                size={"md"}
                            />
                        </WrapItem>
                        <WrapItem>
                            <Flex direction={"column"}>
                                <Flex direction={"column"}>
                                    <Text fontSize={"sm"} fontWeight={"bold"}>
                                        Sabith Muhammed
                                    </Text>
                                    <Text fontSize={"xs"} color={"gray.600"}>
                                        12/4/4000
                                    </Text>
                                </Flex>
                            </Flex>
                        </WrapItem>
                    </Wrap>
                </Stack>
            </Flex>
        </GridItem>
    );
};

export default List;
