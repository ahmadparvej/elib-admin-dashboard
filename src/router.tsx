import { createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { Register } from "./pages/Register";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Books } from './pages/Books';

export const router = createBrowserRouter([
    {
        path: 'dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                path: 'home',
                element: <HomePage/>
            },
            {
                path: 'books',
                element: <Books/>
            }
        ]
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