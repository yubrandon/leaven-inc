import { useContext } from "react";
import NavigationBar from "../components/NavigationBar";
import { ShopContext } from "../utils/ShopContext";
import CartCard from "../components/CartCard";

const CartPage = () => {
    const { cartItems } = useContext(ShopContext);

    return (
        <> 
            <NavigationBar />
            <div className="container-fluid d-flex flex-column align-items-center mt-5">
                {
                    cartItems.map((item) => {
                        return <CartCard
                            key={item.id}
                            item={item}
                        ></CartCard>
                    })
                }
                <button className="btn btn-outline-success col-2 mt-5"
                        onClick={() => {
                            
                        }}
                >Complete Order</button>
            </div>
        </>
    );
};

export default CartPage;