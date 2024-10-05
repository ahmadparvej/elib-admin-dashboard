import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { Register } from "./pages/Register";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Books } from './pages/Books';
import { AuthLayout } from "./layout/AuthLayout";
import { CreateBook } from './pages/CreateBook';

export const router = createBrowserRouter([
    {
        path: "",
        element: <Navigate to="/dashboard/home"/>
    },
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
            },
            {
                path: 'books/create',
                element: <CreateBook/>
            },
            {
                path: 'books/edit',
                element: <CreateBook/>
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
])