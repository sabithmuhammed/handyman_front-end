import React from "react";
import { Link } from "react-router-dom";
type PaginationType = {
    pageCount: number;
    active: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};
const PaginationButton = ({
    pageCount,
    active,
    setPage,
}: PaginationType) => {
    const pageBtn: { className: string; count: number }[] = [];
    for (let i = 1; i <= pageCount; i++) {
        pageBtn.push({
            className: `rounded-full ${
                i === active ? `bg-indigo-950` : `bg-indigo-400`
            } w-7 h-7 mx-1 flex items-center justify-center text-white`,
            count: i,
        });
    }

    return (
        <div className="flex h-7 justify-center w-full">
            {pageBtn.length!==0 && (
                pageBtn.map((btn, index) => (
                    <button
                        className={btn.className}
                        key={index}
                        onClick={() => setPage(btn.count)}
                    >
                        {btn.count}
                    </button>
                ))
            )}
        </div>
    );
};

export default PaginationButton;
