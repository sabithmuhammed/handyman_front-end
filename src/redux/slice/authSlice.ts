import { createSlice } from "@reduxjs/toolkit";

interface user {
    name: string;
    email: string;
    userId: string;
    isTradesman: boolean;
}

interface admin {
    name: string;
    email: string;
}
interface tradesman {
    name: string;
    profile: string;
}

const isUserStored = localStorage.getItem("user");
const isTradesmanStored = localStorage.getItem("tradesman");
const isAdminStored = localStorage.getItem("admin");

const initialState: {
    userInfo: user | null;
    tradesmanInfo: tradesman | null;
    adminInfo: admin | null;
} = {
    userInfo: isUserStored ? JSON.parse(isUserStored) : null,
    tradesmanInfo: isTradesmanStored ? JSON.parse(isTradesmanStored) : null,
    adminInfo: isAdminStored ? JSON.parse(isAdminStored) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userInfo = action.payload.userData;
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload.userData)
            );
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
        setTradesman: (state, action) => {
            const { name, profile, accessToken } = action.payload;
            state.tradesmanInfo = { name, profile };
            localStorage.setItem(
                "tradesman",
                JSON.stringify({ name, profile })
            );
            localStorage.setItem("accessToken", accessToken);
        },
        removeTradesman: (state) => {
            state.tradesmanInfo = null;
            localStorage.removeItem("tradesman");
        },
        loginAdmin: (state, action) => {
            state.adminInfo = action.payload.userData;
            localStorage.setItem(
                "admin",
                JSON.stringify(action.payload.userData)
            );
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        logoutAdmin: (state) => {
            state.adminInfo = null;
            localStorage.removeItem("admin");
            localStorage.removeItem("accessToken");
        },
    },
});

export const {
    loginUser,
    logoutUser,
    setTradesman,
    removeTradesman,
    loginAdmin,
    logoutAdmin,
} = authSlice.actions;

export default authSlice.reducer;
