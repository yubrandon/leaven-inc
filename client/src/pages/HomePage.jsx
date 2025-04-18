import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
    return (
        <>
            <NavigationBar />
            <Link to="/store"><h1>Shop here!</h1></Link>
        </>
    );
};

export default HomePage;