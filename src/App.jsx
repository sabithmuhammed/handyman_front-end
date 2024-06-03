import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <ToastContainer />
                <AppRouter />
            </ChakraProvider>
        </BrowserRouter>
    );
}

export default App;
