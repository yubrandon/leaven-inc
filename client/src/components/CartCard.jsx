import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../utils/ShopContext";
import { hasItem } from "../utils/contextUtils";
import deleteIcon from "../assets/deleteIcon.svg";


const CartCard = ({item}) => {
    const { cache } = useContext(ShopContext);
    const [data, setData] = useState(true);

    useEffect(() => {
        const index = hasItem(item.title, cache);
        //console.log(cache[index]);
        setData(cache[index]);
    }, [cache]);

    return (
        <>
            <div className="container-fluid col-md-6 d-flex flex-row justify-content-between align-items-center border-bottom py-4 my-1 mb-2">
                <div className="d-flex col-10">
                    <img src={`${data.image}`} className="col-2 me-4" style={{width:'100px', height:'100px'}}/>
                    <div className="col-11">
                        <h5 className="mb-3">{item.title}</h5>
                        <div className="d-flex gap-2">
                            <p>Quantity: </p>
                            <div>
                                <div className="input-group">
                                    {item.quantity}
                                    {/**TO DO
                                     * finish delete function
                                     * add quantity editing to cart
                                     * set up server and db
                                     * enable ordering
                                     * set up authentication
                                     * configure rerouting based on authentication
                                     * add admin inventory changing
                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger d-flex justify-content-center" style={{height:'35px', width:'45px'}}>
                    <img src={deleteIcon} style={{filter:"invert(1)"}}/>
                </button>
                
            </div>
        </>
    );
};

export default CartCard;