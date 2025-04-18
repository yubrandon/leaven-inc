import { useState } from "react";

const ItemCard = ({item, onClick}) => {
    //Item objects will have name, image, quantity(?)
    const [quantity, setQuantity] = useState(0);

    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center justify-content-between border rounded-3 py-3" style={{width:'250px', height:'450px'}}>
                <img src={item.image} className="mb-4 p-1" style={{width:'200px', height:'200px'}}/>
                <p className="card-title mb-3">{item.title}</p>
                <div className="col-md-6 mb-3">
                    <div className="input-group">
                        <button className="btn btn-outline-secondary " 
                                onClick={()=> {
                                    quantity ? setQuantity(parseInt(quantity)-1) : {}
                                }}
                        >-</button>
                        <input  className="form-control text-center" 
                                type="number" 
                                value={quantity}
                                readOnly={true}
                        ></input>
                        <button className="btn btn-outline-secondary " 
                                onClick={()=> {
                                    quantity < 99 ? setQuantity(parseInt(quantity)+1) : {};
                                }}
                        >+</button>
                    </div>
                </div>
                <button className="btn btn-outline-success"
                        onClick={() => {
                            onClick(item, quantity)
                            setQuantity(0);
                        }}
                >Add to Cart</button>
            </div>
        </>
    );
};

export default ItemCard;