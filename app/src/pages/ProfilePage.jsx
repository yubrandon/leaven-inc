import NavigationBar from "../components/NavigationBar";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ShopContext } from "../utils/ShopContext";

const ProfilePage = () => {
    const { userId, userName, admin, setUserId, setUserName, setAdmin } = useContext(ShopContext);
    const navigate = useNavigate();
    const { username } = useParams();
    useEffect(() => {
        if(userId === null || userName != username) {
            navigate("/login");
        }
    }, []);


    const signOut = async () => {
        const url = `${import.meta.env.VITE_API_URL}/logout`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const json = await response.json();
        console.log('signout:',json)
        if(response.ok) {
            navigate("/login");
            setUserId(null);
            setUserName("");
            setAdmin(false);
        } else {    
            alert(`Error signing out! Please try again later.`);
        }
    }


    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex flex-row justify-content-center pt-4">

                <div className="d-flex flex-column col-6 align-items-center">
                        <h1 className="mb-5">Hello {admin ? "Noella" : userName}!</h1>
                        <div className="d-flex flex-column align-items-center">

                        {
                            admin ? 
                            (
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
                                </div>

                            ) : 
                            (
                                <div>
                                </div>
                            )
                        }
                        

                        <button className="btn btn-outline-danger"
                                onClick={signOut}

                        >Sign Out</button>
                    </div>
                    
                </div>
                <Outlet /> 

            </div>
        </>
    )
}

export default ProfilePage;

