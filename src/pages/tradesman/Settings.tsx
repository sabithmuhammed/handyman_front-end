import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Profile from "../../components/tradesman/Profile";
import Configuration from "../../components/tradesman/Configuration";
import { Tradesman } from "../../types/stateTypes";
import { getProfileFull } from "../../api/tradesmanApi";

const Settings = () => {
    const [tradesman, setTradesman] = useState<Tradesman | null>();
    useEffect(() => {
        (async () => {
            const res = await getProfileFull();
            console.log(res?.data);

            if (res?.data) {
                setTradesman(res.data);
            }
        })();
    }, []);
    const updateTradesman = (tradesman: Tradesman) => {
        setTradesman(tradesman);
    };
    return (
        <div className="relative">
            <Tabs
                isManual
                variant="enclosed"
                position={"relative"}
            >
                <TabList>
                    {/* <Tab>Profile</Tab> */}
                    <Tab>Configurations</Tab>
                </TabList>
                <TabPanels>
                    {/* <TabPanel w={"full"}>
                        <div className="flex justify-center w-full">
                            <Profile />
                        </div>
                    </TabPanel> */}
                    <TabPanel w={"full"}>
                        <div className="flex justify-center w-full">
                            {tradesman && tradesman.configuration && (
                                <Configuration {...tradesman.configuration} updateTradesman={updateTradesman} />
                            )}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default Settings;
