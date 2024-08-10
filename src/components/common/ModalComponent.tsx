import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import loading from "../../assets/animation/loading.json";
type PropType = {
    title: string;
    children: React.JSX.Element;
    action?: {
        text: string;
        color: string;
        onClick: () => void;
        loading?: boolean;
        disabled?:boolean
    };
    isOpen: boolean;
    onClose: () => void;
};

const ModalComponent = ({
    title,
    children,
    action,
    isOpen,
    onClose,
}: PropType) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w={{ base: "full", md: "fit-content" }} minW={{base:"full",md:"450px"}}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blackAlpha" variant={"outline"} mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {action && (
                        <Button
                            colorScheme={action.color}
                            onClick={action.onClick}
                            isLoading={action.loading ?? false}
                            isDisabled={action.disabled ?? false}
                            spinner={
                                <Lottie
                                    animationData={loading}
                                    loop={true}
                                    className=""
                                />
                            }
                        >
                            {action.text}
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
