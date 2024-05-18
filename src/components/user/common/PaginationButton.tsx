import React from "react";
type PaginationType = {
    page: string;
    active?: boolean;
};
const PaginationButton = ({ page, active=false }: PaginationType) => {
    return <button className={`w-9 h-9 mx-1 text-white hover:bg-orange-500 rounded-full text-xl ${active?`bg-orange-500`:`bg-orange-400`}`}>{page}</button>;
};

export default PaginationButton;
