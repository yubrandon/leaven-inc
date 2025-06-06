const registerUser = async (user) => {
    const url = `${import.meta.env.VITE_API_URL}/register`;
    const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(user),
        }
    );
    if(response.ok) {
        return response;
    }
    else {
        const json = await response.json();
        return json;
    }
}

export default registerUser;