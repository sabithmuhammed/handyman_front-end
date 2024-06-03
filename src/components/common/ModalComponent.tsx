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
import React from "react";
type PropType = {
    title: string;
    children: React.JSX.Element;
    action?: { text: string; color: string; onClick: () => void };
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
            <ModalContent w={"fit-content"}>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    {action && (
                        <Button
                            colorScheme={action.color}
                            onClick={action.onClick}
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
