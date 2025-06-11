import HomePage from "../pages/HomePage";
import StorePage from "../pages/StorePage";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import ServerErrorPage from "../pages/ServerErrorPage";
import ItemForm from "../components/admin/ItemForm";
import ItemDashboard from "../components/admin/ItemDashboard";
import OrderDashboard from "../components/admin/OrderDashboard";
import OrderHistory from "../components/OrderHistory";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "store",
        element: <StorePage />
    },
    {
        path:"cart",
        element: <CartPage />
    },
    {
        path:"register",
        element: <RegistrationPage />
    },
    {
        path:"login",
        element: <LoginPage />
    },
    {
        path:"profile/:username",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
        children: [
            {   
                path:"orders/view/admin",
                element: <OrderDashboard />
            },
            {
                path:"items/add",
                element: <ItemForm />
            },
            {
                path:"items/edit",
                element: <ItemDashboard />
            },
            {
                path:"orders/view",
                element: <OrderHistory />
            }
        ]
    },
    {
        path:"error",
        element: <ServerErrorPage />
    }

]

export default routes;