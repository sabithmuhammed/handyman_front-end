import {
    Button,
    Checkbox,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    Switch,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Tradesman } from "../../types/stateTypes";
import { getProfileFull } from "../../api/tradesmanApi";
import { WorkingDaysTile } from "../../components/tradesman/WorkingDaysTile";
import { GearLoading } from "../../components/common/GearLoading";
import { ServicesTile } from "../../components/tradesman/ServicesTile";
import { LeavesTile } from "../../components/tradesman/LeavesTile";

const Settings = () => {
    const [tradesman, setTradesman] = useState<Tradesman | null>();
    useEffect(() => {
        (async () => {
            const res = await getProfileFull();
            if (res?.data) {
                setTradesman(res.data);
            }
        })();
    }, []);

    return (
        <div className="relative min-h-full h-fit">
            {tradesman ? (
                <div className="grid grid-cols-1  md:grid-cols-2 h-full gap-3  text-gray-800">
                    <WorkingDaysTile
                        workingDaysProp={
                            tradesman.configuration?.workingDays ?? []
                        }
                        slotSizeProp={tradesman.configuration?.slotSize ?? 1}
                        bufferTimeProp={
                            tradesman.configuration?.bufferTime ?? 15
                        }
                        setTradesman={setTradesman}
                    />
                    <div className="grid gap-3 h-[85vh] overflow-auto">
                        <ServicesTile
                            servicesProp={
                                tradesman.configuration?.services ?? []
                            }
                            setTradesman={setTradesman}
                        />
                        <LeavesTile
                            leavesProp={tradesman.configuration?.leaves ?? []}
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols h-[85vh] gap-3  place-items-center">
                    <GearLoading />
                </div>
            )}
        </div>
    );
};

export default Settings;
