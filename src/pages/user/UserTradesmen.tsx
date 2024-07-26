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
import SearchNotFound from "../../components/common/SearchNotFound";
import { Text } from "@chakra-ui/react";

const UserTradesmen = () => {
    const [pageCount, setPageCount] = useState(0);
    const { state } = useLocation();
    const [page, setPage] = useState(1);
    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const [data, setData] = useState<{
        loading: boolean;
        tradesmen: Tradesman[];
    }>({
        loading: true,
        tradesmen: [],
    });

    useEffect(() => {
        if (state?.longitude && state?.latitude) {
            setLocation({
                longitude: state.longitude,
                latitude: state.latitude,
            });
        } else {
            getCurrentLocation(setLocation);
        }
    }, [state]);

    useEffect(() => {
        (async () => {
            if (!location.latitude || !location.longitude) {
                getCurrentLocation(setLocation);
            } else {
                const res = await getTradesmen({
                    category: state?.category || "",
                    date: state?.date || "",
                    page,
                    ...location,
                });
                if (res?.data) {
                    setData({loading:false,tradesmen:res.data.tradesmen});
                    setPageCount(Math.ceil(res.data.totalCount / PAGE_LIMIT));
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
                    {data.loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : data.tradesmen?.length != 0 ? (
                        data.tradesmen.map((tradesman) => (
                            <Card key={tradesman._id} {...tradesman} />
                        ))
                    ) : (
                        <div className="col-span-5 items-center flex flex-col">
                            <SearchNotFound />
                            <Text opacity={0.7}>No tradesman in this area</Text>
                        </div>
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
