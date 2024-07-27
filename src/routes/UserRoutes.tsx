import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import UserProtected from "../components/user/common/UserProtected";
import LoadingSpinner from "../components/common/LoadingSpinner";
const UserHome = lazy(() => import("../pages/user/UserHome"));
const UserLogin = lazy(() => import("../pages/user/UserLogin"));
const UserSignUp = lazy(() => import("../pages/user/UserSignUp"));
const ForgotPassword = lazy(() => import("../pages/user/ForgotPassword"));
const UserTradesmen = lazy(() => import("../pages/user/UserTradesmen"));
const TradesmanProfile = lazy(() => import("../pages/user/TradesmanProfile"));
const Chat = lazy(() => import("../pages/user/Chat"));
const NotFound = lazy(() => import("../pages/NotFound"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const Explore = lazy(() => import("../pages/user/Explore"));


const UserRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="login" element={<UserLogin />} />
                <Route path="signup" element={<UserSignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route element={<UserLayout />}>
                    <Route path="/" index element={<UserHome />} />
                    <Route path="tradesmen" element={<UserTradesmen />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="tradesman-profile/:tradesmanId" element={<TradesmanProfile />} />
                    <Route element={<UserProtected />}>
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="chat" element={<Chat />} />
                    </Route>
                    
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default UserRoutes;
