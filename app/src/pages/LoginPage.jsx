import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useContext, useState } from "react";
import { ShopContext } from "../utils/ShopContext";

const LoginPage = () => {
    const { setUserId, setUserName, setAdmin } = useContext(ShopContext);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);
        const url = `${import.meta.env.VITE_API_URL}/login`;
        const login = async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                credentials: "include",
                body: JSON.stringify(user),
            });
            //console.log(response);
            const json = await response.json();
            console.log(json);
            if(response.ok) {
                setUserId(json.userId);
                setUserName(json.userName);
                setAdmin(json.admin);
                navigate("/profile");
            } else {
                const newErrors = [json.msg];
                setErrors(newErrors);
            }
        };
        await login();
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
                    {
                        errors ? (
                            errors.map((err) => {
                                return  <p  className="mt-2"
                                style={{color:'red'}}
                            >{err}</p>
                            })
                           
                        ) : (
                            {}
                        )
                    }
                </div>
            </form>
        </>
    )
}   

export default LoginPage;