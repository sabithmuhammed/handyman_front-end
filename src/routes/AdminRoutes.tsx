import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProtected from "../components/admin/AdminProtected";
const Verify = lazy(() => import("../pages/admin/Verify"));
const Tradesmen = lazy(() => import("../pages/admin/Tradesmen"));
const Users = lazy(() => import("../pages/admin/Users"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AdminRoutes = () => {
    return (
        <Suspense fallback={<h1>hiii</h1>}>
            <Routes>
                <Route element={<AdminProtected />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/tradesmen" element={<Tradesmen />} />
                        <Route path="/users" element={<Users />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
