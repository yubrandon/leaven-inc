import { useEffect, useState } from "react";
import getAllOrders from "../../utils/getAllOrders";


const orderDashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getAllOrders()
                .catch((error) => setError(error)) ;
            setData(orders);
            setIsLoading(false);
        }
        fetchOrders();
        console.log(data);
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
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" data-bs-toggle="collapse" 
                                            data-bs-target={`#collapse${order.id}`}
                                        >Order #{order.id}</button>
                                        
                                    </h2>
                                    <div className="accordion-collapse collapse" id={`collapse${order.id}`}
                                        data-bs-parent="#orderAccordion" >
                                        <div className="accordion-body">
                                            <p>Customer: {order.username}</p>
                                            <ul>
                                            {data.sales.map((item) => {
                                                //add join with item name in server
                                            if(item.order_id == order.id) {
                                                return <li className="d-flex flex-row justify-content-between">
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