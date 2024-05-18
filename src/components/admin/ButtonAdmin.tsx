import React from "react";
import { IconType } from "react-icons";

type btnType = {
    color: string;
    text: string;
    Icon?: IconType;
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
};
const ButtonAdmin = ({ color, text, Icon,onClick }: btnType) => {
    return (
        <button
            className={`${color} px-6 py-2 rounded-lg text-white w-[150px] h-[50px] me-2 flex items-center justify-evenly`}
            onClick={onClick}
        >
            <p>{text}</p>
            {Icon && <Icon />}
        </button>
    );
};

export default ButtonAdmin;
