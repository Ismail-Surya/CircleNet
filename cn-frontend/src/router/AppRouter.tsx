import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from '../pages/RegisterPage';
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";

function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path = "/"
                    element = {
                        <Navigate to="/login" replace />
                    }
                />

                <Route path = "/login"
                    element = {<LoginPage />}
                />

                <Route path = "/register"
                element = {<RegisterPage />}
                
                />

                <Route path="/profile"
                element = {<ProfilePage />}
                />
                
            </Routes>
        </BrowserRouter>
    );

}

export default AppRouter;