import React, { useEffect, useState } from "react";
import AdminTile from "../../components/admin/AdminTile";
import ViewDetails from "../../components/admin/ViewDetails";
import {
    adminGetPendingVerification,
    reject,
    verify,
} from "../../api/adminApi";
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
import ModalComponent from "../../components/common/ModalComponent";
import { toast } from "react-toastify";
import { Tradesman } from "../../types/stateTypes";



const Verify = () => {
    const [viewData, setViewData] = useState<Tradesman>(
        {} as Tradesman
    );
    const [pendingVerifations, setPendingVerifications] = useState<
        Tradesman[]
    >([]);
    const [currentTradesman, setCurrentTradesman] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            const response = await adminGetPendingVerification();
            console.log(response, "ghjghjkhk");
            if (response?.data) {
                console.log(response);

                setPendingVerifications(response.data);
            }
        })();
    }, []);
    const handleViewData = (id: string) => {
        setViewData(
            pendingVerifations.find(({ _id }) => _id == id) as Tradesman
        );
    };

    const handleVerify = async () => {
        onCloseV();
        const res = await verify(currentTradesman);
        if (res?.data) {
            setPendingVerifications((p) => {
                return p.filter((item) => item._id !== currentTradesman);
            });
            toast.success("Verification request has been verified");
        }
    };
    const handleReject = async () => {
        onCloseR();
        const res = await reject(currentTradesman);
        if (res?.data) {
            setPendingVerifications((p) => {
                return p.filter((item) => item._id !== currentTradesman);
            });
            toast.success("Verification request has been rejected");
        }
    };

    return (
        <Flex direction={"column"} align={"center"} pt={"7"} w="full">
            <Card minW="600px">
                <CardHeader>
                    <Heading size="md">Verify Tradesman</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing="9">
                        {pendingVerifations.length ? (
                            pendingVerifations.map((item, index) => (
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
                                            colorScheme="teal"
                                            size={"sm"}
                                            onClick={() => {
                                                setCurrentTradesman(item._id);
                                                onOpenV();
                                            }}
                                        >
                                            Verify
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            size={"sm"}
                                            onClick={() => {
                                                setCurrentTradesman(item._id);
                                                onOpenR();
                                            }}
                                        >
                                            Reject
                                        </Button>
                                    </HStack>
                                </Box>
                            ))
                        ) : (
                            <p>No new requests</p>
                        )}
                    </Stack>
                </CardBody>
            </Card>
            <ModalComponent isOpen={isOpen} onClose={onClose} title={"Details"}>
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
                <h1>Are you sure that you want to verify this account?</h1>
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
                <h1>Are you sure that you want to reject this account?</h1>
            </ModalComponent>
        </Flex>
    );
};

export default Verify;
