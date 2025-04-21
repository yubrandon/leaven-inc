import HomePage from "../pages/HomePage";
import StorePage from "../pages/StorePage";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/ErrorPage";

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
    }

]

export default routes;