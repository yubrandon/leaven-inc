import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const RegistrationPage = () => {
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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
            const json = await response.json();
            if(response.ok) {
                navigate("login");
            } else {
                const errors = [];
                json.forEach((error) => {
                    errors.push(error.msg);
                })
                setErrorList(errors);
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
                        className="btn btn-outline-success my-3 row col-1"
                    >Register</button>
                    <Link to="/login"><p>Already have an account? Login here!</p></Link>
                </div>
                
            </form>
            <div className="container-fluid d-flex flex-column align-items-center mt-3">
                {
                        errorList ? 
                        ( errorList.map((error) => {
                            return <p style={{color:'red'}}>{error}</p>
                        })
                             ) : 
                        ({})
                }
            </div>
        </>
    );
};

export default RegistrationPage;