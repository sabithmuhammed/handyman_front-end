import {
    Avatar,
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
import PaginationButton from "../../components/user/common/PaginationButton";
type User = {
    profile: string;
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
                setPageCount(Math.ceil(res.data?.totalCount / PAGE_LIMIT));
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

            <Flex direction={"column"} align={"center"} pt={"7"} w="full">
                <Card minW="full" bg="gray.100">
                    <CardBody>
                        <Stack spacing="4">
                            {users.length ? (
                                users.map((item, index) => (
                                    <Box key={item._id} bg="white" p={4}>
                                        <Flex justify={"space-between"}>
                                            <Flex>
                                                <Avatar
                                                    src={item.profile}
                                                    name={item.name}
                                                    me={4}
                                                />
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
            <div className="mt-7">
                <PaginationButton active={page} pageCount={pageCount} setPage={setPage} />
            </div>
        </>
    );
};

export default Users;
