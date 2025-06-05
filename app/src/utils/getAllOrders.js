const getAllOrders = async () => {
    const url = `${import.meta.env.VITE_API_URL}/orders`;
    const response = await fetch(url, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials:"include"
    });
    //console.log(response);
    if(response.ok) {
        const json = await response.json();
        //console.log(json);
        return json;
    }
    
}

export default getAllOrders;