const submitCart = async (id, cart) => {
    const url = `${import.meta.env.VITE_API_URL}/orders`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({id: id, items: cart})
    });
    return response;
    
    
}

export default submitCart;