import { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import { ShopContext } from "../utils/ShopContext";
import CartCard from "../components/CartCard";

const CartPage = () => {
    const { cartItems, removeItem } = useContext(ShopContext);

    return (
        <> 
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center mt-5">
                {
                    cartItems.map((item) => {
                        if(item.quantity === 0) {
                            removeItem(item.data);
                        } else {
                            return <CartCard
                                key={item.data.id}
                                item={item}
                            ></CartCard>
                        }
                    })
                }
                {cartItems.length ? 
                (   <button className="btn btn-outline-success col-2 mt-5"
                        onClick={() => {
                            //push order to db
                            //redirect to success page
                        }}
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