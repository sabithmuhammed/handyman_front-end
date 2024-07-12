import React, { useEffect } from "react";
import { getProfileFull } from "../../api/tradesmanApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const res = await getProfileFull();
            console.log(res?.data);
            
            if (res?.data) {
                if (res.data.configuration.services.length === 0) {
                    toast.warning("Please edit the configurations");
                    navigate("../settings");
                }
            }
        })();
    },[]);
    return <div></div>;
};

export default Dashboard;
