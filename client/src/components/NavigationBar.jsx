import { ShopContext } from "../ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    const { itemCount } = useContext(ShopContext);
    return (
        <nav>
            <div>
                <Link to="/"><h1>Leaven Inc.</h1></Link>
                <Link to="/cart">

                </Link>
            </div>
            <div>
                
            </div>
        </nav>
    )
};

export default NavigationBar;