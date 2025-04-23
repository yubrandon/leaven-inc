import { ShopContext } from "../utils/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import shoppingCart from "../assets/shoppingCart.svg";

const NavigationBar = () => {
    const { itemCount, userId } = useContext(ShopContext);
    return (
        <nav className="navbar px-4 bg-dark pb-2 mb-2">
            <div>
                <Link to="/"  className="text-light link-underline link-underline-opacity-0"><h1>LeavenInc</h1></Link>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center pe-2">
                    
                    <Link   to= {userId ? "/profile" : "/login"}
                            className="link-underline link-underline-opacity-0 pe-4">
                                <p className="text-light m-0"><strong>Account</strong></p>
                    </Link>
                    <Link   to="/store" 
                            className="link-underline link-underline-opacity-0 pe-4">
                                <p className="text-light m-0"><strong>Store</strong></p>
                    </Link>
                </div>
                <Link to="/cart">
                    <button type="button" className="btn btn-primary position-relative px-3">
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