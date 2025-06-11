import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex flex-column align-items-center mb-5"> 
                <div className='d-flex gap-3 p-3'>
                    <button className='btn btn-outline-dark'
                        onClick={() => {
                            navigate("orders/view");
                        }}
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserPage;