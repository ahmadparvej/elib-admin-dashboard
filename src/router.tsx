import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
    {
        path: '/homepage',
        element: <HomePage/>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])