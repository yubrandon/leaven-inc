import HomePage from "../pages/HomePage";
import StorePage from "../pages/StorePage";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import ServerErrorPage from "../pages/ServerErrorPage";

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
        path:"profile",
        element: <ProfilePage />
    },
    {
        path:"error",
        element: <ServerErrorPage />
    }

]

export default routes;