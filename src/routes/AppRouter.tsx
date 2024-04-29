import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<UserRoutes />} />
        </Routes>
    );
};

export default AppRouter;
