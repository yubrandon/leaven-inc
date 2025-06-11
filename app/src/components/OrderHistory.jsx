import { useContext, useEffect, useState } from "react";
import getOrderById from "../utils/getOrderById";
import { ShopContext } from "../utils/ShopContext";

const OrderHistory = () => {
    const { userId } = useContext(ShopContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserOrders = async () => {
            const orders = await getOrderById(userId)
                .catch((error) => setError(error));
            setData(orders);
            setIsLoading(false);
            //console.log(orders);
        }   
        getUserOrders();
    }, []);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center border-start">
                {
                isLoading ? <h2>Loading...</h2> : (
                    error ? 
                    <h2>Error! {error}</h2>
                    : 
                    <div className="d-flex flex-column align-items-center col-9">
                    <h3 className="mb-3">View Orders</h3>
                    <div className="accordion col-12" id="orderAccordion">
                    {
                        data.orders.map((order) => {
                            return (
                            <div key={`order-${order.id}`} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" data-bs-toggle="collapse" 
                                        data-bs-target={`#collapse${order.id}`}
                                    >Order #{order.id}</button>
                                    
                                </h2>
                                <div className="accordion-collapse collapse" id={`collapse${order.id}`}
                                    data-bs-parent="#orderAccordion" >
                                    <div className="accordion-body">
                                        <div className="d-flex flex-row justify-content-between">
                                            <p>Customer: {order.username}</p>
                                            <div>
                                                <strong>
                                                {order.completed ? 
                                                    "Order Fulfilled!"
                                                :
                                                    "Order in Progress"
                                                }
                                                </strong>
                                            </div>
                                        </div>
                                        <ul>
                                        {data.sales.map((item) => {
                                        if(item.order_id == order.id) {
                                            return <li key={`item-${item.id}-order-${order.id}`} className="d-flex flex-row justify-content-between">
                                                <p>{item.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </li>
                                            }
                                        })
                                        }                                   
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            )
                            
                        })
                    }
                    </div>
                </div>
                    )
                    }
            </div>
        </>
    )
}

export default OrderHistory;