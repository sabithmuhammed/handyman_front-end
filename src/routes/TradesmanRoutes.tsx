import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import UserProtected from "../components/user/common/UserProtected";
const Register = lazy(() => import("../pages/tradesman/register"));

const TadesmanRoutes = () => {
    return (
        <Suspense fallback={<h1>hiii</h1>}>
            <Routes>
                <Route element={<UserProtected />}>
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Suspense>
    );
};

export default TadesmanRoutes;
