import {
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
import { blockTradesmen, getTradesmen, unblockTradesmen } from "../../api/adminApi";
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
            const res = await getAllTradesmen({ category:"" });
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
        <Flex direction={"column"} align={"center"} pt={"7"} w="full">
            <Card minW="600px">
                <CardHeader>
                    <Heading size="md">All Verified Tradesmen</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="9">
                        {tradesmen.length ? (
                            tradesmen.map((item, index) => (
                                <Box key={item._id}>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        {item.name}
                                    </Heading>
                                    <Text py="3" fontSize="sm">
                                        {item.skills.reduce(
                                            (acc, cur) => acc + ", " + cur
                                        )}
                                    </Text>
                                    <HStack spacing={"4"}>
                                        <Button
                                            colorScheme="blue"
                                            size={"sm"}
                                            onClick={() => {
                                                handleViewData(item._id);
                                                onOpen();
                                            }}
                                        >
                                            View details
                                        </Button>
                                        <Button
                                            colorScheme={
                                                item.isBlocked ? "teal" : "red"
                                            }
                                            size={"sm"}
                                            onClick={() => {
                                                setCurrentTradesman(item._id);
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
                                </Box>
                            ))
                        ) : (
                            <p>No tradesmen found</p>
                        )}
                    </Stack>
                </CardBody>
            </Card>

            <ModalComponent isOpen={isOpen} onClose={onClose} title={"Details"}>
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
                <h1>Are you sure that you want to unblock this tradesman?</h1>
            </ModalComponent>
        </Flex>
    );
};

export default Tradesmen;
