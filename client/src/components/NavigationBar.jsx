import { ShopContext } from "../ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/shoppingCart.svg";

const NavigationBar = () => {
    const { itemCount } = useContext(ShopContext);
    return (
        <nav className="navbar px-4 bg-dark pb-2 mb-2">
            <div>
                <Link to="/"  className="text-light link-underline link-underline-opacity-0"><h1>Leaven Inc</h1></Link>
            </div>
            <div className="d-flex align-items-center">
                {/** profile component handle login under hover */}
                <Link to="/store" className="link-underline link-underline-opacity-0 pe-3"><p className="text-light m-0">Store</p></Link>
                <Link to="/cart">
                    <button type="button" className="btn btn-primary position-relative px-4">
                        <img className="" style={{height:'30px', filter:'invert(1)'}} src={shoppingCart} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                            {itemCount ?
                                (itemCount > 99 ? '99+' : `${itemCount}`) 
                                : 0
                            }
                        </span>
                    </button>
                </Link>
            </div>            
            
        </nav>
    )
};

export default NavigationBar;