import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserProtected from "../components/user/common/UserProtected";
import TradesmanLayout from "../components/layout/TradesmanLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
const Register = lazy(() => import("../pages/tradesman/Register"));
const Dashboard = lazy(() => import("../pages/tradesman/Dashboard"));
const Posts = lazy(() => import("../pages/tradesman/Posts"));

const TadesmanRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route element={<UserProtected />}>
                    <Route path="register" element={<Register />} />
                </Route>
                <Route element={<TradesmanLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="posts" element={<Posts />} />
                </Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Suspense>
    );
};

export default TadesmanRoutes;
