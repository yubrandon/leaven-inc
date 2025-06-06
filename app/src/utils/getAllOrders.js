const getAllOrders = async () => {
    const url = `${import.meta.env.VITE_API_URL}/orders`;
    const response = await fetch(url, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials:"include"
    });
    if(response.ok) {
        const json = await response.json();
        return json;
    }
    
}

export default getAllOrders;