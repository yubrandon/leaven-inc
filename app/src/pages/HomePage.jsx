import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
    return (
        <>
            <NavigationBar />
            <div className="container-fluid d-flex justify-content-center pt-3">
                <Link to="/store" className="btn btn-outline-primary"><h1>Shop here!</h1></Link>
            </div>
        </>
    );
};

export default HomePage;