import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import CardListLayout from "../components/layout/CardListLayout";
import UserProtected from "../components/user/common/UserProtected";
const UserHome = lazy(() => import("../pages/user/UserHome"));
const UserLogin = lazy(() => import("../pages/user/UserLogin"));
const UserSignUp = lazy(() => import("../pages/user/UserSignUp"));
const UserTradesmen = lazy(() => import("../pages/user/UserTradesmen"));

const UserRoutes = () => {
    return (
        <Suspense fallback={<h1>hiii</h1>}>
            <Routes>
                <Route path="login" element={<UserLogin />} />
                <Route path="signup" element={<UserSignUp />} />
                <Route element={<UserLayout />}>
                    <Route path="/" index element={<UserHome />} />
                        <Route path="tradesmen" element={<UserTradesmen />} />
                   
                </Route>
                <Route element={<UserProtected />}>//protected routes</Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Suspense>
    );
};

export default UserRoutes;
