import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import CardListLayout from "../components/layout/CardListLayout";
import UserProtected from "../components/user/common/UserProtected";
import LoadingSpinner from "../components/common/LoadingSpinner";
const UserHome = lazy(() => import("../pages/user/UserHome"));
const UserLogin = lazy(() => import("../pages/user/UserLogin"));
const UserSignUp = lazy(() => import("../pages/user/UserSignUp"));
const UserTradesmen = lazy(() => import("../pages/user/UserTradesmen"));
const UserTools = lazy(() => import("../pages/user/UserTools"));
const AddTool = lazy(() => import("../pages/user/AddTool"));
const ManageTools = lazy(() => import("../pages/user/ManageTools"));
const TradesmanProfile = lazy(() => import("../pages/user/TradesmanProfile"));
const Chat = lazy(() => import("../pages/user/Chat"));

const UserRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="login" element={<UserLogin />} />
                <Route path="signup" element={<UserSignUp />} />
                <Route element={<UserLayout />}>
                    <Route path="/" index element={<UserHome />} />
                    <Route path="tradesmen" element={<UserTradesmen />} />
                    <Route path="tools" element={<UserTools />} />
                    <Route element={<UserProtected />}>
                        <Route path="add-tool" element={<AddTool />} />
                        <Route path="manage-tools" element={<ManageTools />} />
                    </Route>
                    <Route path="tradesman-profile" element={<TradesmanProfile />} />
                    <Route element={<UserProtected />}>
                        <Route path="chat" element={<Chat />} />
                    </Route>
                </Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Suspense>
    );
};

export default UserRoutes;
