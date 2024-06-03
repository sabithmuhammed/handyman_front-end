import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Image,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { blockUser, getUsers, unblockUser } from "../../api/adminApi";
import { PAGE_LIMIT } from "../../constants/pagesConstants";
import ModalComponent from "../../components/common/ModalComponent";
type User = {
    name: string;
    email: string;
    isBlocked: boolean;
    isTradesman: boolean;
    _id: string;
};

const Users = () => {
    const [searchParams] = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [currentUser, setCurrentUser] = useState("");
    const {
        isOpen: isOpenB,
        onOpen: onOpenB,
        onClose: onCloseB,
    } = useDisclosure();
    const {
        isOpen: isOpenU,
        onOpen: onOpenU,
        onClose: onCloseU,
    } = useDisclosure();

    useEffect(() => {
        (async () => {
            const res = await getUsers({ page });
            if (res?.data) {
                setUsers(res.data?.users);
                setPageCount(Math.floor(res.data?.totalCount / PAGE_LIMIT));
            }
        })();
    }, [page]);
    const handleBlock = async () => {
        const res = await blockUser(currentUser);
        if (res?.data) {
            setUsers((t) => {
                return t.map((item) => {
                    if (item._id == currentUser) {
                        return { ...item, isBlocked: true };
                    }
                    return item;
                });
            });
            onCloseB();
        }
    };

    const handleUnblock = async () => {
        const res = await unblockUser(currentUser);
        if (res?.data) {
            setUsers((t) => {
                return t.map((item) => {
                    if (item._id == currentUser) {
                        return { ...item, isBlocked: false };
                    }
                    return item;
                });
            });
            onCloseU();
        }
    };

    return (
        <>
            <Text fontSize={"2xl"} fontWeight={"800"} top={"0"}>
                All users
            </Text>
            <Grid gap="6" overflow={"auto"}>
                {users.length ? (
                    users.map((item, index) => (
                        <GridItem w={"full"} bg="white">
                            <Card
                                direction={{ base: "column", sm: "row" }}
                                overflow="hidden"
                                variant="outline"
                            >
                                <Image
                                    objectFit="cover"
                                    maxW={{ base: "100%", sm: "200px" }}
                                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                    alt="Caffe Latte"
                                />

                                <Stack>
                                    <CardBody>
                                        <Heading size="md">
                                            {item.name}
                                        </Heading>

                                        <Text py="2">
                                            {item.email}
                                        </Text>
                                    </CardBody>

                                    <CardFooter>
                                        <Button
                                            variant="solid"
                                            colorScheme="blue"
                                        >
                                            Buy Latte
                                        </Button>
                                    </CardFooter>
                                </Stack>
                            </Card>
                        </GridItem>
                    ))
                ) : (
                    <p>No users found</p>
                )}
                <GridItem w={"full"} bg="white">
                    <Card>
                        <CardBody></CardBody>
                    </Card>
                </GridItem>
                <GridItem>dfjkdshjkfd</GridItem>
                <GridItem>dfjkdshjkfd</GridItem>
            </Grid>
            <Flex direction={"column"} align={"center"} pt={"7"} w="full">
                <Card minW="full" bg="gray.100">
                    <CardHeader>
                        <Heading size="md">All Users</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack spacing="20">
                            {users.length ? (
                                users.map((item, index) => (
                                    <Box key={item._id} bg="white">
                                        <Flex justify={"space-between"}>
                                            <Flex direction={"column"}>
                                                <Heading
                                                    size="xs"
                                                    textTransform="uppercase"
                                                >
                                                    {item.name}
                                                </Heading>
                                                <Text py="3" fontSize="sm">
                                                    {item.email}
                                                </Text>
                                            </Flex>
                                            <HStack spacing={"4"}>
                                                <Button
                                                    colorScheme={
                                                        item.isBlocked
                                                            ? "teal"
                                                            : "red"
                                                    }
                                                    size={"sm"}
                                                    onClick={() => {
                                                        setCurrentUser(
                                                            item._id
                                                        );
                                                        if (item.isBlocked) {
                                                            onOpenU();
                                                        } else {
                                                            onOpenB();
                                                        }
                                                    }}
                                                >
                                                    {item.isBlocked
                                                        ? "Unblock"
                                                        : "Block"}
                                                </Button>
                                            </HStack>
                                        </Flex>
                                    </Box>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </Stack>
                    </CardBody>
                </Card>

                <ModalComponent
                    isOpen={isOpenB}
                    onClose={onCloseB}
                    title={"Confirmation"}
                    action={{
                        text: "Block",
                        color: "red",
                        onClick: handleBlock,
                    }}
                >
                    <h1>Are you sure that you want to block this user?</h1>
                </ModalComponent>
                <ModalComponent
                    isOpen={isOpenU}
                    onClose={onCloseU}
                    title={"Confirmation"}
                    action={{
                        text: "Unblock",
                        color: "teal",
                        onClick: handleUnblock,
                    }}
                >
                    <h1>Are you sure that you want to unblock this user?</h1>
                </ModalComponent>
            </Flex>
        </>
    );
};

export default Users;
