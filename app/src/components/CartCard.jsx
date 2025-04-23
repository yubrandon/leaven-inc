import { useContext } from "react";
import { ShopContext } from "../utils/ShopContext";
import deleteIcon from "../assets/deleteIcon.svg";


const CartCard = ({item}) => {
    const { removeItem, editItem } = useContext(ShopContext);

    return (
        <>
            <div className="container-fluid col-md-6 d-flex flex-row justify-content-between align-items-center border-bottom py-4 my-1 mb-2">
                <div className="d-flex col-10">
                    <img src={`${item.data.url}`} className="col-2 me-4" style={{width:'100px', height:'100px'}}/>
                    <div className="col-10">
                        <h5 className="mb-3">{item.data.name}</h5>
                        <div className="d-flex gap-3 align-items-center">
                            <p className="m-0">Quantity: </p>
                            <div className="col-2" >
                                <div className="input-group">
                                    <button
                                        onClick={() => {editItem(item.data, 0)}} 
                                        className="btn btn-outline-danger px-2"
                                    >-</button>
                                    <input 
                                        className="form-control text-center"
                                        type="number"
                                        value={item.quantity}
                                        readOnly={true}
                                    ></input>
                                     <button 
                                        onClick={() => {editItem(item.data, 1)}} 
                                        className="btn btn-outline-success px-2"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger d-flex justify-content-center" 
                        style={{height:'35px', width:'45px'}}
                        onClick={() => {
                            removeItem(item.data);
                        }}
                >
                    <img src={deleteIcon} style={{filter:"invert(1)"}}/>
                </button>
                
            </div>
        </>
    );
};

export default CartCard;