import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from '../pages/RegisterPage';

function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path = "/"
                    element = {
                        <Navigate to="/register" replace />
                    }
                />

                <Route path = "/register"
                element = {<RegisterPage />}
                
                />
                
            </Routes>
        </BrowserRouter>
    );

}

export default AppRouter;