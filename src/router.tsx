import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
    {
        path: '/homepage',
        element: <HomePage/>
    },
    {
        path: '/login',
        element: <Login />
    }
])