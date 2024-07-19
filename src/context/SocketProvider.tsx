import React, { createContext, useContext, useMemo, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { tradesmanInfo } = useSelector((state: RootState) => state.auth);
    const socket = useMemo(() => {
        if (userInfo) {
            return io(import.meta.env.VITE_CHAT_URL, {
                query: {
                    userId: userInfo.userId,
                    tradesmanId: tradesmanInfo?.tradesmanId ?? null,
                }, // Send user ID as a query parameter or any other auth token
            });
        }
        return null;
    }, [userInfo?.userId,tradesmanInfo]);

    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};
