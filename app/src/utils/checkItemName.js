const checkItemName = async (name) => {
    const url = `${import.meta.env.VITE_API_URL}/items/${name}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials:"include"
        
    });
    const json = await response.json();
    //Set exists value to true or false based on status code
    if(response.ok) {
        json.exists = true;
    }
    else {
        json.exists = false;
    }
    return json;
}

export default checkItemName;