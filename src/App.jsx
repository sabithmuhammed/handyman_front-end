import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from "./context/SocketProvider";
function App() {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <SocketProvider>
                    <ToastContainer autoClose={2000} />
                    <AppRouter />
                </SocketProvider>
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
