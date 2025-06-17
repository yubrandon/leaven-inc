import { useEffect, useState } from "react";
import getAllOrders from "../../utils/getAllOrders";
import { useNavigate } from "react-router-dom";
import updateOrderComplete from "../../utils/updateOrderComplete";

const orderDashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleComplete = async (e) => {
        console.log('setting complete');
        const res = await updateOrderComplete(e.target.value);
        if(res.ok) {
            navigate("..");
            alert('Order marked complete!');
        }
        else {
            alert("Error updating order! Try again later.");
        }
        
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getAllOrders()
                .catch((error) => setError(error));
            setData(orders);
            setIsLoading(false);
        }
        fetchOrders();
    }, []);
    return (
        <div className="container-fluid d-flex justify-content-center border-start">
            {isLoading ? 
                (
                    <h2>Loading...</h2>
                ) : (error ? 
                (   <h2>Error! {error}</h2>
                ) : (
                    <div className="d-flex flex-column align-items-center col-9">
                        <h3 className="mb-3">View Orders</h3>
                        <div className="accordion col-12" id="orderAccordion">
                        {
                            data.orders.map((order) => {
                                return (
                                <div key={`order-${order.id}`} className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" data-bs-toggle="collapse" 
                                            data-bs-target={`#collapse${order.id}`}
                                        >Order #{order.id}</button>
                                        
                                    </h2>
                                    <div className="accordion-collapse collapse" id={`collapse${order.id}`}
                                        data-bs-parent="#orderAccordion" >
                                        <div className="accordion-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <p>Customer: {order.username}</p>
                                                <div>
                                                    {order.completed ? 
                                                        <strong>Order Completed</strong>
                                                    :
                                                        <button className="btn btn-outline-success d-flex align-items-center" 
                                                                style={{height:"30px"}}
                                                                onClick={handleComplete}
                                                                value={order.id}
                                                                >Complete Order</button>
                                                    }
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
                )
            }
        </div>
    )
}

export default orderDashboard;