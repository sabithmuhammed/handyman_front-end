import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    HStack,
    Heading,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tradesman } from "../../types/stateTypes";
import {
    blockTradesmen,
    getTradesmen,
    unblockTradesmen,
} from "../../api/adminApi";
import { PAGE_LIMIT } from "../../constants/pagesConstants";
import ModalComponent from "../../components/common/ModalComponent";
import ViewDetails from "../../components/admin/ViewDetails";
import { getAllTradesmen } from "../../api/userApi";

const Tradesmen = () => {
    const [searchParams] = useSearchParams();
    const [tradesmen, setTradesmen] = useState<Tradesman[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [viewData, setViewData] = useState<Tradesman>({} as Tradesman);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentTradesman, setCurrentTradesman] = useState("");
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
            const res = await getTradesmen({ category: "", page });
            if (res?.data) {
                setTradesmen(res.data?.tradesmen);
                setPageCount(Math.floor(res.data?.totalCount / PAGE_LIMIT));
            }
        })();
    }, [page]);
    const handleViewData = (id: string) => {
        setViewData(tradesmen.find(({ _id }) => _id == id) as Tradesman);
    };
    const handleBlock = async () => {
        const res = await blockTradesmen(currentTradesman);
        if (res?.data) {
            setTradesmen((t) => {
                return t.map((item) => {
                    if (item._id == currentTradesman) {
                        return { ...item, isBlocked: true };
                    }
                    return item;
                });
            });
            onCloseB();
        }
    };

    const handleUnblock = async () => {
        const res = await unblockTradesmen(currentTradesman);
        if (res?.data) {
            setTradesmen((t) => {
                return t.map((item) => {
                    if (item._id == currentTradesman) {
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
            <Text fontSize={"2xl"} fontWeight={"800"} top={"28"} position={"fixed"} >
                All Tradesmen
            </Text>

            <Flex direction={"column"} align={"center"} pt={"7"} w="full">
                <Card minW="full" bg="gray.100">
                    <CardBody>
                        <Stack spacing="4">
                            {tradesmen.length ? (
                                tradesmen.map((item, index) => (
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
                                                        {item.category}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                            <HStack spacing={"4"}>
                                                <Button
                                                    colorScheme="blue"
                                                    size={"sm"}
                                                    onClick={() => {
                                                        handleViewData(
                                                            item._id
                                                        );
                                                        onOpen();
                                                    }}
                                                >
                                                    View details
                                                </Button>
                                                <Button
                                                    colorScheme={
                                                        item.isBlocked
                                                            ? "teal"
                                                            : "red"
                                                    }
                                                    size={"sm"}
                                                    onClick={() => {
                                                        setCurrentTradesman(
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
                                <p>No tradesman found</p>
                            )}
                        </Stack>
                    </CardBody>
                </Card>

                <ModalComponent
                    isOpen={isOpen}
                    onClose={onClose}
                    title={"Details"}
                >
                    <ViewDetails {...viewData} />
                </ModalComponent>

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
                    <h1>Are you sure that you want to block this tradesman?</h1>
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
                    <h1>
                        Are you sure that you want to unblock this tradesman?
                    </h1>
                </ModalComponent>
            </Flex>
        </>
    );
};

export default Tradesmen;
