import { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import { ShopContext } from "../utils/ShopContext";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import submitCart from "../utils/submitCart";

const CartPage = () => {
    const { userId, cartItems, removeItem, emptyCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const response = await submitCart(userId, cartItems);
        if(response.ok) {
            alert("Your order has been placed!")
            navigate("/store"); 
            emptyCart();
        }
        else {
            alert("Please log in and try again!");
        }
    }
    return (
        <> 
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center mt-5">
                {
                    cartItems.map((item) => {
                        if(item.quantity === 0) {
                            removeItem(item);
                        } else {
                            return <CartCard
                                key={item.id}
                                item={item}
                            ></CartCard>
                        }
                    })
                }
                {cartItems.length ? 
                (   <button className="btn btn-outline-success col-2 mt-5"
                        onClick={handleSubmit}
                    >Complete Order</button>
                ) : (
                    <h1>Your cart is empty!</h1>
                )
                }
            </div>
        </>
    );
};

export default CartPage;