import React from "react";
import ButtonAdmin from "./ButtonAdmin";
import { MdUnfoldMore } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const AdminTile = ({
    name,
    skills,
    _id,
    index,
    setViewData,
    setShowDetails,
}) => {
    return (
        <div className="w-full bg-slate-300 h-32 my-2 rounded-lg grid grid-cols-5 px-5 items-center">
            <div className="">{name}</div>
            <div className="">
                {skills.reduce((acc, cur) => acc + ", " + cur)}
            </div>
            <div className="col-span-3 flex justify-end">
                <ButtonAdmin
                    color="bg-blue-400"
                    text="View details"
                    Icon={MdUnfoldMore}
                    onClick={() => {
                        setViewData(index);
                        setShowDetails(true);
                        
                    }}
                />
                <ButtonAdmin
                    color="bg-green-400"
                    text="Accept"
                    Icon={MdOutlineVerified}
                />
                <ButtonAdmin
                    color="bg-red-400"
                    text="Reject"
                    Icon={ImCancelCircle}
                />
            </div>
        </div>
    );
};

export default AdminTile;
