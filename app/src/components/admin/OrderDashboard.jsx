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
    }, []);
    return (
        <div className="container-fluid d-flex justify-content-center border-start">
            {isLoading ? 
                (
                    <h2>Loading...</h2>
                ) : (error ? 
                (   <h2>Error! {error}</h2>
                ) : (
                    <div className="d-flex flex-column align-items-center">
                        {
                            //accordion object to show individual transactions
        
                            data.orders.map((order) => {
                                return <div className="d-flex flex-column align-items-center gap-3">
                                    <div className="d-flex flex-row justify-content-center gap-5">
                                        <strong><p>Order #{order.id}</p></strong>
                                        <p>Customer: {order.user_id}</p>
                                    </div>
                                    <ul>
                                    {data.sales.map((item) => {
                                    if(item.order_id == order.id) {
                                        return <li className="d-flex flex-row justify-content-center gap-5">
                                            <p>Item:{item.item_id}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </li>
                                        }
                                    })
                                    }                                   
                                    </ul>
                                
                                </div>
                                
                            })
                        }
                    </div>
                )
                )
            }
        </div>
    )
}

export default orderDashboard;