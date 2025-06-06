import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import registerUser from "../utils/registerUser";

const RegistrationPage = () => {
    const [errorList, setErrorList] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);
        const response = await registerUser(user); 
        if(response.ok) {
            navigate("../login");
        } else {
            const errors = [];
            response.forEach((error) => {
                errors.push(error.msg);
            })
            setErrorList(errors);
        }   
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
                                    required
                            ></input>
                        </label>
                    </div>
                    <div className="mb-3 row col-2">
                        <label htmlFor="password" className="form-label">
                            Password
                            <input type="password" name="password" className="form-control" required></input>
                        </label>
                    </div>
                    <div className="my-3 row col-2">
                        <label htmlFor="email" className="form-label">
                            Email
                            <input  type="email" 
                                    name="email" 
                                    className="form-control"
                                    required
                            ></input>
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