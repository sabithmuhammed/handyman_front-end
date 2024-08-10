import {
    Button,
    Input,
    NumberInput,
    NumberInputField,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ServiceType, Tradesman } from "../../types/stateTypes";
import ModalComponent from "../../components/common/ModalComponent";
import { toast } from "react-toastify";
import {
    addService,
    deleteService,
    updateService,
} from "../../api/tradesmanApi";
import { PopoverComponent } from "../common/PopoverComponent";

type PropsType = {
    servicesProp: ServiceType[];
    setTradesman: React.Dispatch<
        React.SetStateAction<Tradesman | null | undefined>
    >;
};

export const ServicesTile = ({ servicesProp, setTradesman }: PropsType) => {
    const [services, setServices] = useState([...servicesProp]);

    const {
        isOpen: isOpenA,
        onClose: onCloseA,
        onOpen: onOpenA,
    } = useDisclosure();

    const {
        isOpen: isOpenU,
        onClose: onCloseU,
        onOpen: onOpenU,
    } = useDisclosure();

    const [updateIndex, setUpdateIndex] = useState<number>();
    const [editingService, setEditingService] = useState({
        _id: "",
        slots: 1,
        description: "",
        amount: "100.00",
    });
    useEffect(() => {
        if (updateIndex !== undefined) {
            setEditingService({
                ...services[updateIndex],
                amount: String(services[updateIndex].amount),
            });
        }
    }, [updateIndex]);

    const [newService, setNewService] = useState({
        slots: 1,
        description: "",
        amount: "100.00",
    });

    const addNewService = async () => {
        if (!newService.description.trim()) {
            toast.error("Please provide a description");
            return;
        }

        const dataObj = {
            description: newService.description.trim(),
            slots: newService.slots,
            amount: Number(newService.amount),
        };

        const res = await addService(dataObj);
        if (res?.data) {
            setServices(res.data.configuration.services);
            setNewService({ description: "", slots: 1, amount: "100.00" });
        }

        onCloseA();
    };

    const handleDelete = async (id: string) => {
        const res = await deleteService(id);
        if (res?.data) {
            setServices((p) => p.filter((service) => service._id !== id));
        }
    };

    const handleUpdate = async () => {
        if (!editingService.description.trim()) {
            toast.error("Please provide a description");
            return;
        }
        const dataObj = {
            description: editingService.description.trim(),
            slots: editingService.slots,
            amount: Number(editingService.amount),
        };
        const res = await updateService(editingService._id, dataObj);
        if (res?.data) {
            setServices(res.data.configuration.services);
            toast.success("Service updated")
        }
        onCloseU()
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-3 ">
            <div className="flex justify-between mb-3">
                <Text as={"b"}>Services</Text>
                <Button size={"sm"} variant={"outline"} onClick={onOpenA}>
                    Add service
                </Button>
            </div>
            {services.length !== 0 ? (
                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>Service</Th>
                                <Th isNumeric>Slots needed</Th>
                                <Th isNumeric>Amount (&#8377;)</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {services.map((service, index) => (
                                <Tr key={service._id}>
                                    <Td>{service.description}</Td>
                                    <Td isNumeric>{service.slots}</Td>
                                    <Td isNumeric>{service.amount}</Td>
                                    <Td>
                                        <Button
                                            size={"xs"}
                                            onClick={() => {
                                                setUpdateIndex(index);
                                                onOpenU();
                                            }}
                                        >
                                            <AiOutlineEdit />
                                        </Button>
                                        <PopoverComponent
                                            description="Do you really want to delete this service?"
                                            action={{
                                                colorScheme: "red",
                                                text: "Delete",
                                                handler: () =>
                                                    handleDelete(service._id),
                                            }}
                                        >
                                            <Button
                                                size={"xs"}
                                                colorScheme="red"
                                                ms={3}
                                            >
                                                <RiDeleteBin5Line />
                                            </Button>
                                        </PopoverComponent>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <div className="w-full h-2/3 flex justify-center items-center">
                    <Text textAlign={"center"} mt={5} color={"red.300"}>
                        No services
                    </Text>
                </div>
            )}
            <ModalComponent
                isOpen={isOpenA}
                onClose={onCloseA}
                title="Add service"
                action={{
                    color: "blue",
                    text: "Add",
                    onClick: () => {
                        addNewService();
                    },
                }}
            >
                <div className="">
                    <div className="mb-4">
                        <Text>Description</Text>
                        <Input
                            value={newService.description}
                            onChange={(e) =>
                                setNewService((p) => ({
                                    ...p,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex">
                        <div className="">
                            <Text>Slots required</Text>
                            <NumberInput
                                precision={2}
                                value={newService.slots}
                                onChange={(value) =>
                                    setNewService((p) => ({
                                        ...p,
                                        slots: Number(value),
                                    }))
                                }
                                min={1}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </div>
                        <div className="ms-2">
                            <Text>Amount (&#8377;)</Text>
                            <NumberInput
                                precision={2}
                                value={newService.amount}
                                onChange={(value) =>
                                    setNewService((p) => ({
                                        ...p,
                                        amount: value,
                                    }))
                                }
                                min={1}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </div>
                    </div>
                </div>
            </ModalComponent>
            <ModalComponent
                isOpen={isOpenU}
                onClose={onCloseU}
                title="Add service"
                action={{
                    color: "blue",
                    text: "Edit",
                    onClick: () => {
                        handleUpdate();
                    },
                }}
            >
                <div className="">
                    <div className="mb-4">
                        <Text>Description</Text>
                        <Input
                            value={editingService.description}
                            onChange={(e) =>
                                setEditingService((p) => ({
                                    ...p,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex">
                        <div className="">
                            <Text>Slots required</Text>
                            <NumberInput
                                precision={2}
                                value={editingService.slots}
                                onChange={(value) =>
                                    setEditingService((p) => ({
                                        ...p,
                                        slots: Number(value),
                                    }))
                                }
                                min={1}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </div>
                        <div className="ms-2">
                            <Text>Amount (&#8377;)</Text>
                            <NumberInput
                                precision={2}
                                value={editingService.amount}
                                onChange={(value) =>
                                    setEditingService((p) => ({
                                        ...p,
                                        amount: value,
                                    }))
                                }
                                min={1}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </div>
    );
};
