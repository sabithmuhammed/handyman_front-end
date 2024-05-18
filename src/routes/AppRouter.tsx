import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import TradesmanRoutes from "./TradesmanRoutes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/tradesman/*" element={<TradesmanRoutes />} />
        </Routes>
    );
};

export default AppRouter;
