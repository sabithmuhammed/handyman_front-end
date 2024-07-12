import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserProtected from "../components/user/common/UserProtected";
import TradesmanProtected from "../components/tradesman/TradesmanProtected";
import TradesmanLayout from "../components/layout/TradesmanLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
const Register = lazy(() => import("../pages/tradesman/Register"));
const Dashboard = lazy(() => import("../pages/tradesman/Dashboard"));
const Posts = lazy(() => import("../pages/tradesman/Posts"));
const Chat = lazy(() => import("../pages/tradesman/Chat"));
const Schedules = lazy(() => import("../pages/tradesman/Schedules"));
const Settings = lazy(() => import("../pages/tradesman/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

const TadesmanRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route element={<UserProtected />}>
                    <Route path="register" element={<Register />} />
                </Route>
                <Route element={<TradesmanProtected />}>
                    <Route element={<TradesmanLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="posts" element={<Posts />} />
                        <Route path="chats" element={<Chat />} />
                        <Route path="settings" element={<Settings />} />

                        <Route path="schedules" element={<Schedules />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default TadesmanRoutes;
