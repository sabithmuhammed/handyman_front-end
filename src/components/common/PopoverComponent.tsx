import {
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
type PropType = {
    children: any;
    description: string;
    isLoading?: boolean;
    action: {
        text: string;
        handler: () => void;
        colorScheme: string;
    };
};

export const PopoverComponent = ({
    children,
    action,
    description,
    isLoading = false,
}: PropType) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    return (
        <Popover isOpen={isOpen} onClose={onClose} placement="bottom" >
            <PopoverTrigger>
                <div className="w-fit h-fit inline-block" onClick={onToggle}>
                    {children}
                </div>
            </PopoverTrigger>
            <PopoverContent bg={"gray.600"} color="white">
                <PopoverHeader fontWeight="semibold">
                    Confirmation
                </PopoverHeader>
                <PopoverArrow bg={"gray.600"} />
                <PopoverCloseButton />
                <PopoverBody>{description}</PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                        <Button
                            variant="outline"
                            color={"white"}
                            _hover={{ opacity: 0.9 }}
                            _active={{}}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme={action.colorScheme}
                            onClick={() => {
                                action.handler();
                                onClose();
                            }}
                        >
                            {action.text}
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};
