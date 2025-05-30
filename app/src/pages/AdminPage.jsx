import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex flex-column align-items-center mb-5">
                <div className="d-flex gap-3 p-3">
                    <button className="btn btn-outline-success"
                            onClick={() => {
                                navigate("items/add");
                            }}
                    
                    >Add Item</button>
                    <button className="btn btn-outline-secondary border border-secondary"
                            onClick={() => {
                                navigate("items/edit");
                            }}
                    >Edit Items</button>
                </div>
                <div>
                    <button className="btn btn-outline-dark"
                            onClick={() => {
                                navigate("orders/view");
                            }}
                    
                    >Check Orders</button>
                </div> 
            </div>
        </>
    )
}

export default AdminPage;