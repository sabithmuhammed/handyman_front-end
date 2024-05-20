import React, { useEffect, useState } from "react";
import PaginationButton from "../../components/user/common/PaginationButton";
import Card from "../../components/user/common/Card";
import Filter from "../../components/user/common/Filter";
import { Tradesman } from "../../types/stateTypes";
import { getTradesmen } from "../../api/userApi";
import { PAGE_LIMIT } from "../../constants/pagesConstants";
import { useSearchParams } from "react-router-dom";

const UserTradesmen = () => {
    const [searchParams] = useSearchParams();
    const [tradesmen, setTradesmen] = useState<Tradesman[] | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    useEffect(() => {
        (async () => {
            const res = await getTradesmen({ page });
            if (res?.data) {
                setTradesmen(res.data?.tradesmen);
                setPageCount(Math.floor(res.data?.totalCount / PAGE_LIMIT));
            }
        })();
    }, [page]);
    return (
        <>
            <Filter />
            <div className="pt-16 px-9">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Our Best Tradesmen
                </h1>

                <div className="grid grid-cols-5 gap-5 my-6 text-gray-900">
                    {tradesmen &&
                        tradesmen.map((tradesman) => (
                            <Card key={tradesman._id} {...tradesman} />
                        ))}
                </div>
            </div>
            <PaginationButton
                pageCount={pageCount}
                active={page}
                setPage={setPage}
                link="/tradesmen"
            />
        </>
    );
};

export default UserTradesmen;
