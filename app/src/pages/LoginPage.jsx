import { useNavigate, Link } from "react-router-dom";

/**
 * TO DO
 * get credential inputs from user
 * authenticate and start session
 */

import NavigationBar from "../components/NavigationBar";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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
                    >Log in</button>
                    <Link to="/register"><p>Don't have an account? Register now!</p></Link>
                </div>
            </form>
        </>
    )
}   

export default LoginPage;