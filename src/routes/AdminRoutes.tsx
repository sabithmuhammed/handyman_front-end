import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminProtected from "../components/admin/AdminProtected";
const Verify = lazy(() => import("../pages/admin/Verify"));

const AdminRoutes = () => {
    return (
        <Suspense fallback={<h1>hiii</h1>}>
            <Routes>
                <Route element={<AdminProtected />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/verify" element={<Verify />} />
                    </Route>
                </Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Suspense>
    );
};

export default AdminRoutes;
