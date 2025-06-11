const getOrderById = async (id) => {
    const url = `${import.meta.env.VITE_API_URL}/orders/${id}`;
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(response.ok){
        const json = await response.json();
        return json;
    }
    else {
        return response;
    }
}

export default getOrderById;