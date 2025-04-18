import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid">
                <Link to="/store"><h1>Shop here!</h1></Link>
            </div>
        </>
    );
};

export default HomePage;