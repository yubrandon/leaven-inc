import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        //console.log(formData);
        const user = Object.fromEntries(formData);
        const register = async () => {
            const url = `${import.meta.env.VITE_API_URL}/register`;
            const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );
            console.log('resposne:',response);
            if(response.ok) {
                navigate("/login");
            } else {
                navigate("/error");
            }   
        }
        await register();
    }
    return ( 
        <>
            <NavigationBar />
            <form onSubmit={handleSubmit} method="POST" className="">
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="my-3 row col-2">
                        <label htmlFor="display" className="form-label">
                            Display name
                            <input  type="text" 
                                    name="display" 
                                    id="display" 
                                    className="form-control"
                            ></input>
                        </label>
                    </div>
                    <div className="mb-3 row col-2">
                        <label htmlFor="username" className="form-label">
                            Username
                            <input  type="text" 
                                    name="username" 
                                    className="form-control"
                            ></input>
                        </label>
                    </div>
                    <div className="mb-3 row col-2">
                        <label htmlFor="password" className="form-label">
                            Password
                            <input type="password" name="password" className="form-control"></input>
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        value="Submit"
                        className="btn btn-primary my-3 row col-1"
                    >Register</button>
                    <Link to="/login"><p>Already have an account? Login</p></Link>
                </div>
                
            </form>
        </>
    );
};

export default RegistrationPage;
/**
 * TO DO - AFTER SETTING UP EXPRESS SERVER
 * FORM TO GET INFORMATION
 * PUSH INFORMATION TO DB
 */

/**TO DO
 * set up authentication
 * configure rerouting based on authentication
 * add admin inventory changing
 */