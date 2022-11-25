import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import CategoryBooks from "../pages/BooksByCategory/CategoryBooks";
import AddProducts from "../pages/dashboard/AddProducts";
import AllBuyers from "../pages/dashboard/AllBuyers";
import AllSeller from "../pages/dashboard/AllSeller";
import MyBuyers from "../pages/dashboard/MyBuyers";
import MyOrders from "../pages/dashboard/MyOrders";
import MyProducts from "../pages/dashboard/MyProducts";
import ReportedItems from "../pages/dashboard/ReportedItems";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/loginPage/Login";
import SignUp from "../pages/SignUpPage/SignUp";
import AdminRoutes from "./AdminRoutes";
import SellerRoutes from "./SellerRoutes";
import UserRoutes from "./UserRoutes";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/category/:id',
                element: <CategoryBooks/>,
                loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`) 
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }
        ]

    },
    {
        path:'/dashboard',
        element: <UserRoutes><DashboardLayout/></UserRoutes>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:'/dashboard/add-products',
                element: <SellerRoutes><AddProducts/></SellerRoutes>
            },
            {
                path:'/dashboard/my-buyers',
                element:<SellerRoutes><MyBuyers/></SellerRoutes>
            },
            {
                path:'/dashboard/my-products',
                element:<SellerRoutes><MyProducts/></SellerRoutes>
            },
            {
                path:'/dashboard/all-buyers',
                element:<AdminRoutes><AllBuyers/></AdminRoutes>
            },
            {
                path:'/dashboard/all-sellers',
                element:<AdminRoutes><AllSeller/></AdminRoutes>
            },
            {
                path:'/dashboard/reported-items',
                element:<AdminRoutes><ReportedItems/></AdminRoutes>
            },
            {
                path:'/dashboard/my-orders',
                element:<UserRoutes><MyOrders/></UserRoutes>
            },
        ]
    }
]);

export default routes; 