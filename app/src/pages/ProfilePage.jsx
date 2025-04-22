import NavigationBar from "../components/NavigationBar";
/**
 * TO DO
 * after express server set up, block access if not authenticated
 * display orders in dropdown
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

