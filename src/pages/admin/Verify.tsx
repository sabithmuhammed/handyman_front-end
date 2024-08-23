import React, { useEffect, useState } from "react";
import AdminTile from "../../components/admin/AdminTile";
import ViewDetails from "../../components/admin/ViewDetails";
import {
    adminGetPendingVerification,
    reject,
    verify,
} from "../../api/adminApi";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    HStack,
    Heading,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "../../components/common/ModalComponent";
import { toast } from "react-toastify";
import { Tradesman } from "../../types/stateTypes";
import { PAGE_LIMIT } from "../../constants/pagesConstants";

const Verify = () => {
    const [viewData, setViewData] = useState<Tradesman>({} as Tradesman);
    const [pendingVerifications, setPendingVerifications] = useState<
        Tradesman[]
    >([]);
    const [currentTradesman, setCurrentTradesman] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const {
        isOpen: isOpenV,
        onOpen: onOpenV,
        onClose: onCloseV,
    } = useDisclosure();
    const {
        isOpen: isOpenR,
        onOpen: onOpenR,
        onClose: onCloseR,
    } = useDisclosure();

    useEffect(() => {
        (async () => {
            const res = await adminGetPendingVerification(page);
            if (res?.data) {
                setPendingVerifications(res.data?.tradesmen);
                setPageCount(Math.ceil(res.data?.totalCount / PAGE_LIMIT));
            }
        })();
    }, [page]);

    const handleViewData = (id: string) => {
        setViewData(
            pendingVerifications.find(({ _id }) => _id === id) as Tradesman
        );
    };

    const handleVerify = async () => {
        onCloseV();
        const res = await verify(currentTradesman);
        if (res?.data) {
            setPendingVerifications((prev) =>
                prev.filter((item) => item._id !== currentTradesman)
            );
            toast.success("Verification request has been verified");
        }
    };

    const handleReject = async () => {
        onCloseR();
        const res = await reject(currentTradesman);
        if (res?.data) {
            setPendingVerifications((prev) =>
                prev.filter((item) => item._id !== currentTradesman)
            );
            toast.success("Verification request has been rejected");
        }
    };

    return (
        <>
            <Text fontSize={"2xl"} fontWeight={"800"}>
                Verify Tradesman
            </Text>
            <Flex direction={"column"} align={"center"} pt={"7"} w="full">
                <Card minW="full" bg="gray.100">
                    <CardBody>
                        <Stack spacing="4">
                            {pendingVerifications.length ? (
                                pendingVerifications.map((item) => (
                                    <Box key={item._id} bg="white" p={4}>
                                        <Flex justify={"space-between"}>
                                            <Flex>
                                                <Avatar
                                                    src={item.profile}
                                                    name={item.name}
                                                    me={4}
                                                    borderRadius={"sm"}
                                                    size={"lg"}
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
                                                    colorScheme="teal"
                                                    size={"sm"}
                                                    onClick={() => {
                                                        setCurrentTradesman(
                                                            item._id
                                                        );
                                                        onOpenV();
                                                    }}
                                                >
                                                    Verify
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    size={"sm"}
                                                    onClick={() => {
                                                        setCurrentTradesman(
                                                            item._id
                                                        );
                                                        onOpenR();
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </HStack>
                                        </Flex>
                                    </Box>
                                ))
                            ) : (
                                <Text>No new requests</Text>
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
                    isOpen={isOpenV}
                    onClose={onCloseV}
                    title={"Confirmation"}
                    action={{
                        text: "Verify & Send Mail",
                        color: "teal",
                        onClick: handleVerify,
                    }}
                >
                    <Text>
                        Are you sure that you want to verify this account?
                    </Text>
                </ModalComponent>
                <ModalComponent
                    isOpen={isOpenR}
                    onClose={onCloseR}
                    title={"Confirmation"}
                    action={{
                        text: "Reject & Send Mail",
                        color: "red",
                        onClick: handleReject,
                    }}
                >
                    <Text>
                        Are you sure that you want to reject this account?
                    </Text>
                </ModalComponent>
            </Flex>
        </>
    );
};

export default Verify;
