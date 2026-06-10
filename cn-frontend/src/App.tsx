import { useEffect } from "react";
import { registerUser } from "./services/authService";
import AppRouter from "./Router/AppRouter";

function App () {

    return (
        <AppRouter />
    );
}

export default App;