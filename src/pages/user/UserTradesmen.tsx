import React, { useEffect, useState } from "react";
import PaginationButton from "../../components/user/common/PaginationButton";
import Card from "../../components/user/common/Card";
import Filter from "../../components/user/common/Filter";
import { LocationType, Tradesman } from "../../types/stateTypes";
import { getTradesmen } from "../../api/userApi";
import { PAGE_LIMIT } from "../../constants/pagesConstants";
import { useLocation, useSearchParams } from "react-router-dom";
import getCurrentLocation from "../../utils/getCurrentLocation";
import CardSkeleton from "../../components/skeletons/CardSkeleton";

const UserTradesmen = () => {
    const [tradesmen, setTradesmen] = useState<Tradesman[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const { state } = useLocation();
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        setLocation({
            longitude: state?.longitude,
            latitude: state?.latitude,
        });
    }, []);

    useEffect(() => {
        (async () => {
            console.log(location,state);

            if (!location.latitude || !location.longitude) {
                console.log("im causing trouble");

                getCurrentLocation(setLocation);
            } else {
                const res = await getTradesmen({
                    category: "",
                    ...state,
                    page,
                    ...location,
                });
                if (res?.data) {
                    setTradesmen(res.data?.tradesmen);
                    setPageCount(Math.floor(res.data?.totalCount / PAGE_LIMIT));
                    setloading(false);
                }
            }
        })();
    }, [page, state, location]);

    return (
        <>
            <Filter />
            <div className="py-5 md:py-16 px-5 md:px-9">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
                    Tradesmen Near you
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 my-6 text-gray-900 max-md:place-items-center">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : tradesmen?.length != 0 ? (
                        tradesmen.map((tradesman) => (
                            <Card key={tradesman._id} {...tradesman} />
                        ))
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <PaginationButton
                pageCount={pageCount}
                active={page}
                setPage={setPage}
            />
        </>
    );
};

export default UserTradesmen;
