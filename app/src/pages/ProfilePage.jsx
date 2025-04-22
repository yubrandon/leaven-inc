import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
/**
 * fetch /users
 * if !ok | 401, navigate to login
 * if ok, display user info.
 * 
 */
const ProfilePage = () => {
    const handleSubmit = async () => {
        const url = `${import.meta.env.VITE_API_URL}/protected`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            },
            credentials: "include",
        })
        console.log(response);
        const json = await response.json();

        console.log(json);
        const cookieValue = document.cookie;
        console.log("cookie:",cookieValue);
    }
    return (
        <>
            <NavigationBar />
            <div>
                <button onClick={handleSubmit}>test login</button>
            </div>
        </>
    )
}

export default ProfilePage;

