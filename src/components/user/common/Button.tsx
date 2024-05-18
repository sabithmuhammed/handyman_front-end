import React from "react";
type ButtonType = {
    text: string;
    icon?: React.JSX.Element;
    color?:string,
    textColor?:string
};

const Button = ({ text, icon,color,textColor }: ButtonType) => {
    return (
        <button className={` ${color?color:`bg-orange-400`} rounded-[20px] flex items-center justify-center pe-3 ps-2 hover:bg-orange-500 shadow-lg`}>
            {icon ? (
                <div className="bg-white rounded-full flex justify-center p-[6px]">{icon}</div>
            ) : null}

            <div className={`${textColor?textColor:`text-white`} ${icon?`text-sm`:`text-xl font-semibold`}`}>{text}</div>
        </button>
    );
};

export default Button;
